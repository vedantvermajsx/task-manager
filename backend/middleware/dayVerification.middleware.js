import Task from "../models/Task.model.js";

async function dayVerification(req,res,next){

    const id=req.params.id;
    const task=await Task.findById(id);

    const today=new Date().toLocaleDateString();
    const taskDueDate=(new Date(task.dueDate)).toLocaleDateString();

    if(!task){
        return res.status(404).json({success:false,message:"Task not found"});
    }


    if(taskDueDate<today){
        return res.status(400).json({success:false,message:"cant alter past day task data"});
    }

    if(taskDueDate>today){
        return res.status(400).json({success:false,message:"cant alter future day task data"});
    }

    next();
}

export default dayVerification;
