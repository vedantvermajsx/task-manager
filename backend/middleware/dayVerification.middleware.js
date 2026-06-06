import Task from "../models/Task.model.js";
import { formatDate, getTodayDate } from "../utils/dateUtils.js";

async function dayVerification(req,res,next){

    const id=req.params.id;
    const task=await Task.findById(id);

    if(!task){
        return res.status(404).json({success:false,message:"Task not found"});
    }

    const today = getTodayDate();
    const taskDueDate = task.dueDate; // Already stored as YYYY-MM-DD

    if(taskDueDate < today){
        return res.status(400).json({success:false,message:"cant alter past day task data"});
    }

    if(taskDueDate > today){
        return res.status(400).json({success:false,message:"cant alter future day task data"});
    }

    next();
}

export default dayVerification;
