import Task from "../models/Task.model.js";

async function dayVerification(req,res,next){

    const id=req.params.id;
    const task=await Task.findById(id);

    const today=(new Date()).toISOString().split("T")[0];
    const taskCreationDate=(task.createdAt).toISOString().split("T")[0];


    if(!task){
        return res.status(404).json({success:false,message:"Task not found"});
    }

    if(taskCreationDate!==today){
        return res.status(400).json({success:false,message:"cant alter previous day task data"});
    }

    next();
}

export default dayVerification;
