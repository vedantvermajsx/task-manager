import Task from "./Task";
import { useEffect, useState, useRef, useCallback } from "react";
import TaskApi from "../api/TaskApi";

const SCROLLABLE_MAX_HEIGHT = "700px";

const TaskList = ({ selectedDate, tasks, setTasks, tasksCount, setTasksCount }) => {
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadingRef = useRef(false);
    const hasMoreRef = useRef(true);
    const scrollContainerRef = useRef(null);


    const fetchTasks = useCallback(async () => {
        if (loadingRef.current || !hasMoreRef.current) return;

        loadingRef.current = true;
        setLoading(true);

        try {
            const fetchedTasks = await TaskApi.getTasks(selectedDate);

            if (fetchedTasks.success) {
                const newTasks = fetchedTasks.ResponseTasks || [];

                if (newTasks.length === 0) {
                    hasMoreRef.current = false;
                    setHasMore(false);
                } else {
                    setTasks(prev => [...prev, ...newTasks]);
                    setTasksCount(fetchedTasks.totalTasks);
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    }, [selectedDate, setTasks]);


    useEffect(() => {
        TaskApi.resetPagination();
        setTasks([]);
        setHasMore(true);
        hasMoreRef.current = true;
        loadingRef.current = false;
        fetchTasks();

    }, [selectedDate, fetchTasks]);

    // Scroll listener on the container div instead of window
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            if (scrollTop + clientHeight >= scrollHeight - 200) {
                fetchTasks();
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, [fetchTasks]);

    const onDelete = async (id) => {
        try {
            const response = await TaskApi.deleteTask(id);

            if (response.success) {
                setTasks((prev) => prev.filter((t) => t._id !== id));
                setTasksCount(prev => prev - 1);
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const onToggle = async (id) => {
        try {
            const task = tasks.find((t) => t._id === id);

            const updatedTask = {
                ...task,
                completed: !task.completed,
            };

            const response = await TaskApi.updateTask(id, updatedTask);

            if (response.success) {
                setTasks((prev) =>
                    prev.map((t) =>
                        t._id === id
                            ? { ...t, completed: updatedTask.completed }
                            : t
                    )
                );
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const onEdit = async (id, updatedData) => {
        try {
            const response = await TaskApi.updateTask(id, updatedData);
            if (response.success) {
                setTasks((prev) =>
                    prev.map((t) => (t._id === id ? { ...t, ...updatedData } : t))
                );
            }
        } catch (error) {
            console.error("Error editing task:", error);
        }
    };

    // Styles for the scrollable container
    const containerStyle = {
        maxHeight: SCROLLABLE_MAX_HEIGHT,
        overflowY: "auto",
        paddingRight: "8px",
        position: "relative",
    };

    // Custom scrollbar styles
    const scrollbarCSS = `
        .task-scroll-container::-webkit-scrollbar {
            width: 6px;
        }
        .task-scroll-container::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.03);
            border-radius: 10px;
        }
        .task-scroll-container::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 10px;
        }
        .task-scroll-container::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.25);
        }
    `;

    return (
        <div style={{ position: "relative" }}>
            {/* Header */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
            }}>
                <h3 style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                }}>
                    Tasks — {selectedDate.toDateString()}
                </h3>
                <span style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    background: "rgba(255,255,255,0.05)",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.08)",
                }}>
                    {tasksCount} task{tasksCount !== 1 ? "s" : ""}
                </span>
            </div>

            {/* Inject scrollbar styles */}
            <style>{scrollbarCSS}</style>

            {/* Scrollable task container */}
            <div
                ref={scrollContainerRef}
                className="task-scroll-container"
                style={containerStyle}
            >
                {tasks.length === 0 && !loading && (
                    <div style={{
                        textAlign: "center",
                        padding: "48px 24px",
                        color: "rgba(255,255,255,0.3)",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                    }}>
                        No tasks for this date
                    </div>
                )}

                {tasks.map((task) => (
                    <Task
                        key={`task-${task._id || task.id}`}
                        id={task._id || task.id}
                        {...task}
                        onDelete={onDelete}
                        onToggle={onToggle}
                        onEdit={onEdit}
                        fetchTasks={fetchTasks}
                    />
                ))}

                {loading && (
                    <div style={{
                        textAlign: "center",
                        padding: "20px",
                        color: "rgba(255,255,255,0.4)",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                    }}>
                        Loading...
                    </div>
                )}
                {!hasMore && tasks.length > 0 && (
                    <div style={{
                        textAlign: "center",
                        padding: "16px",
                        color: "rgba(255,255,255,0.25)",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                    }}>
                        — End of tasks —
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskList;