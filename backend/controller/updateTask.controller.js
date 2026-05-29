import Task from "../models/Task.model.js";

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