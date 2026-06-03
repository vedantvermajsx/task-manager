import Task from "../models/Task.model.js";
import TaskResponse from "../models/TaskResponse.model.js";

async function getTasks(req,res){
    try {
        const userId=req.user.id;

        
        const page = parseInt(req.query.page) >= 0 ? parseInt(req.query.page) : -1;
        const limit = parseInt(req.query.size) > 0 ? parseInt(req.query.size) : -1;
        
        let filter = { createdBy: userId };
        
        if (req.query.all !== 'true') {
            const dateRequest = req.query.date || Date.now();
            const start = new Date(dateRequest);
            start.setHours(0, 0, 0, 0);

            const end = new Date(dateRequest);
            end.setHours(23, 59, 59, 999);
            
            filter.createdAt = { $gte: start, $lte: end };
        }

        let query = Task.find(filter);
        if (page >= 0 && limit > 0) {
            const skip = page * limit;
            query = query.skip(skip).limit(limit);
        }
        const taskCount = await Task.countDocuments({createdBy:userId,createdAt:filter.createdAt});
        
        const Tasks = await query;
        const ResponseTasks = Tasks.map((task) => new TaskResponse(task));
        
        return res.status(200).json({success:true,ResponseTasks,totalTasks:taskCount});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

export default getTasks;