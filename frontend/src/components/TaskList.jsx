import Task from "./Task";
import { useEffect, useState, useRef, useCallback } from "react";
import TaskApi from "../api/TaskApi";

const SCROLLABLE_MAX_HEIGHT = "700px";
import MyToaster from "./MyToaster";

const TaskList = ({ selectedDate, tasks, setTasks, tasksCount, setTasksCount, allTasks, setAllTasks }) => {
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
                    setAllTasks(prev => {
                        const existingIds = new Set(prev.map(t => t._id));
                        const tasksToAdd = newTasks.filter(t => !existingIds.has(t._id));
                        return [...prev, ...tasksToAdd];
                    });
                    setTasksCount(fetchedTasks.totalTasks);
                }
            }
        } catch (err) {
            MyToaster.error(err?.response?.data?.message || err.message || "Failed to fetch tasks");
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    }, [selectedDate, setTasks, setAllTasks]);

    useEffect(() => {
        TaskApi.resetPagination();
        setTasks([]);
        setHasMore(true);
        hasMoreRef.current = true;
        loadingRef.current = false;
        fetchTasks();

    }, [selectedDate, fetchTasks]);

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
                setAllTasks((prev) => prev.filter((t) => t._id !== id));
                setTasksCount(prev => prev - 1);
            }
        } catch (error) {
            MyToaster.error(error?.response?.data?.message || error.message || "Failed to delete task");
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
                const newTaskData = { ...task, completed: updatedTask.completed };
                setTasks((prev) =>
                    prev.map((t) =>
                        t._id === id
                            ? newTaskData
                            : t
                    )
                );
                setAllTasks((prev) =>
                    prev.map((t) =>
                        t._id === id
                            ? newTaskData
                            : t
                    )
                );
            }
        } catch (error) {
            MyToaster.error(error?.response?.data?.message || error.message || "Failed to update task");
        }
    };

    const onEdit = async (id, updatedData) => {
        try {
            const response = await TaskApi.updateTask(id, updatedData);
            if (response.success) {
                const newTaskData = { ...tasks.find((t) => t._id === id), ...updatedData };
                setTasks((prev) =>
                    prev.map((t) => (t._id === id ? newTaskData : t))
                );
                setAllTasks((prev) =>
                    prev.map((t) => (t._id === id ? newTaskData : t))
                );
            }
        } catch (error) {
            MyToaster.error(error?.response?.data?.message || error.message || "Failed to update task");
        }
    };

    const containerStyle = {
        maxHeight: SCROLLABLE_MAX_HEIGHT,
        overflowY: "auto",
        paddingRight: "8px",
        position: "relative",
    };

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
            {}
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

            {}
            <style>{scrollbarCSS}</style>

            {}
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