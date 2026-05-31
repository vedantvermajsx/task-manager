import Task from "../models/Task.model.js";
import User from "../models/User.model.js";

async function updateTask(req,res){
    try {
        const {id}=req.params;
        const userId=req.user.id;
        const {title,description,completed}=req.body;

        if(!id){
            return res.status(400).json({success:false,message:"Task not found"});
        }

        const task=await Task.findById(id);
        
        if(!task){
            return res.status(404).json({success:false,message:"Task not found"});
        }

        if(task.createdBy!=userId){
            return res.status(401).json({success:false,message:"Unauthorized"});
        }

        const hoursElapsed = (Date.now() - new Date(task.createdAt).getTime()) / (1000 * 60 * 60);
        if(hoursElapsed >= 24 && !task.completed){
            return res.status(403).json({success:false,message:"Task has expired after 24 hours and is now failed. No changes allowed."});
        }

        const updatedTask=await Task.findByIdAndUpdate(id,{title,description,completed,createdBy:userId},{returnDocument:'after'});

        if(task.completed!=completed){
            if(completed){
                await User.findByIdAndUpdate(userId, {
                    $inc: { completedTasks: 1 }
                });
            }else{
                await User.findByIdAndUpdate(userId, {
                    $inc: { completedTasks: -1 }
                });
            }
        }

        res.status(200).json({success:true,message:"Task updated successfully"},updatedTask);
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

export default updateTask;