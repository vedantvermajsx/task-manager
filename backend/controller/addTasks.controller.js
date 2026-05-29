import Task from "../models/Task.model.js";
import TaskResponse from "../models/TaskResponse.model.js";

async function addTask(req,res){
    try {

        const { title, description, completed } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const task = new Task({
            title,
            description,
            completed,
            createdBy: req.user.id
        });

        await task.save();

        await User.findByIdAndUpdate(req.user.id, {
            $inc: { totalTasks: 1 }
        });

        const ResponseTask = new TaskResponse(task);

        res.status(201).json({
            success: true,
            message: "Task added successfully",
            ResponseTask
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

export default addTask;