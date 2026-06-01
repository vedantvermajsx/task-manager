import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        length:{
            min:3,
            max:50
        },
        required:true,
        unique:false
    },
    email:{
        type:String,
        length:{
            min:3,
            max:50
        },
        required:true,
        unique:true
    },
    avatar:{
        type:String,
        length:{
            min:3,
            max:200
        },
        default:"https://res.cloudinary.com/druwykigf/image/upload/v1780329397/profile/pxwrgsoklqrc8s7cms3t.avif"
    },
    description:{
        type:String,
        length:{
            min:0,
            max:500
        },
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
        required:true,
    }
})

const User=mongoose.model('User',userSchema)

export default User;
