import Task from "../models/Task.model.js";
import TaskResponse from "../models/TaskResponse.model.js";

async function getTasks(req,res){
    try {
        const userId=req.user.id;

        const dateRequest=req.query?.date;
        const all=req.query?.all;


        
        const page = parseInt(req.query.page) >= 0 ? parseInt(req.query.page) : -1;
        const limit = parseInt(req.query.size) > 0 ? parseInt(req.query.size) : -1;
        
        let filter = { createdBy: userId };
        
        if (all !== 'true') {
            
            const filterDate= (dateRequest && new Date(dateRequest).toLocaleDateString()) || new Date().toLocaleDateString();
            
            filter.dueDate = filterDate;
        }

        let query = Task.find(filter);
        if (page >= 0 && limit > 0) {
            const skip = page * limit;
            query = query.skip(skip).limit(limit);
        }
        const taskCount = await Task.countDocuments({createdBy:userId,dueDate:filter.dueDate});
        
        const Tasks = await query;
        const ResponseTasks = Tasks.map((task) => new TaskResponse(task));
        
        return res.status(200).json({success:true,ResponseTasks,totalTasks:taskCount});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

export default getTasks;