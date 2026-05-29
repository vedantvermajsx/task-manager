import Task from "../models/Task.model.js";
import TaskResponse from "../models/TaskResponse.model.js";

async function getTasks(req,res){
    try {
        const userId=req.user.id;

        
        const page=req.query.page || -1;
        const limit=req.query.size || -1;
        const dateRequest=req.query.date || Date.now();

        const start = new Date(dateRequest);
        start.setHours(0, 0, 0, 0);

        const end = new Date(dateRequest);
        end.setHours(23, 59, 59, 999);

        const skip=(page)*limit;
        
        const Tasks=await Task.find({createdBy:userId, createdAt:{$gte:start,$lte:end}}).skip(skip).limit(limit);
        const ResponseTasks=Tasks.map((task)=>new TaskResponse(task));
        return res.status(200).json({success:true,ResponseTasks});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

export default getTasks;