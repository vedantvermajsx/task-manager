import Task from "./Task";
import { useEffect, useState, useRef, useCallback } from "react";
import TaskApi from "../api/TaskApi";

const TaskList = ({ selectedDate, tasks, setTasks }) => {
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadingRef = useRef(false);
    const hasMoreRef = useRef(true);


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

    useEffect(() => {
        const handleScroll = () => {
            const bottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 100;

            if (bottom) {
                fetchTasks();
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () =>
            window.removeEventListener("scroll", handleScroll);
    }, [fetchTasks]);

    const onDelete = async (id) => {
        try {
            const response = await TaskApi.deleteTask(id);

            if (response.success) {
                setTasks((prev) => prev.filter((t) => t._id !== id));
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

    return (
        <div>
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

            {loading && <p>Loading...</p>}
            {!hasMore && <p>No more tasks</p>}
        </div>
    );
};

export default TaskList;