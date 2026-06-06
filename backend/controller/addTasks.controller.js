import Task from "../models/Task.model.js";
import TaskResponse from "../models/TaskResponse.model.js";
import User from "../models/User.model.js";

async function addTask(req,res){
    try {

        const { title, description, completed, dueDate } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        
        const updateDueDate=new Date(dueDate).toLocaleDateString();
          
        const todayDate=new Date().toLocaleDateString();

        
        if(updateDueDate && updateDueDate<todayDate){
            return res.status(400).json({
                success: false,
                message: "Due date cannot be in the past"
            });
        }

        const task = new Task({
            title,
            description,
            completed,
            dueDate: updateDueDate || todayDate,
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