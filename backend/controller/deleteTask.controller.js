import Task from "../models/Task.model.js";

async function deleteTask(req,res){
    try {
        const {id}=req.params;
        const userId=req.user.id;

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

        await Task.findByIdAndDelete(id);

        await User.findByIdAndUpdate(userId, {
            $inc: { totalTasks: -1 }
        });

        res.status(200).json({success:true,message:"Task deleted successfully"});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

export default deleteTask;
