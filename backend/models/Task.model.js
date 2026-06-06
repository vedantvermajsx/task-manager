import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength:100
    },
    description:{
        type:String,
        required:false,
        maxLength:1000
    },
   completed:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    dueDate:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const Task=mongoose.model('Task',taskSchema)

export default Task;