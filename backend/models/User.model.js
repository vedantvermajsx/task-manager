import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    avatar:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
    description:{
        type:String,
        default:""
    },
    totalTasks:{
        type:Number,
        default:0
    },
    completedTasks:{
        type:Number,
        default:0
    },
    password:{        
        type:String,
        required:true
    }
})

const User=mongoose.model('User',userSchema)

export default User;
