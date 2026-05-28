import express from 'express'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import {connectDB} from './utils/db.js'
import User from './models/User.model.js'
import Task from './models/Task.model.js'
import generateToken from './utils/token.js'
import Authenticate from './middleware/Authenticate.js'
import cookieParser from 'cookie-parser'
import cors from 'cors';
import TaskResponse from './models/TaskResponse.model.js'
import UserResponse from './models/UserResponse.model.js'



const app=express();
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://localhost:5174"
    ],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json()); //ye hota hai body pars
dotenv.config();
connectDB();



const PORT=process.env.PORT || 8080;


app.get("/health",(req,res)=>{
    res.status(200).json({success:true,message:"OK"});
})


app.get("/auth/me",Authenticate,async (req,res)=>{
    const user=await User.findById(req.user.id);
    const ResponseUser=new UserResponse(user);
    res.status(200).json({success:true,ResponseUser});
})

app.post("/auth/login",async (req,res)=>{

    const {email,password}=req.body; //yha se hamlog req se email and passwoed nikalega

    if(!email || !password){ //yha check krenge ki user se email and password dono diye hai ya nhi
        return res.status(400).json({success:false,message:"All fields are required"});
    }

    const user=await User.findOne({email}); //yha hamlog user ko database se nikalege
    if(!user){ //yha check krenge ki user database me hai ya nhi
        return res.status(404).json({success:false,message:"User not found"});
    }






    const isPasswordValid=await bcrypt.compare(password,user.password); //yha hamlog password ko compare krega
    if(!isPasswordValid){ //yha check krenge ki password sahi hai ya nhi
        return res.status(401).json({success:false,message:"Invalid password"});
    }

    const token=generateToken(user);

    res.cookie("jwt",token,{
        maxAge:24*60*60*1000
    });

    const ResponseUser=new UserResponse(user);
    res.status(200).json({success:true,message:"User logged in successfully",ResponseUser});
})

app.post("/auth/register", async (req, res) => {


    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success:false,
            message: "All fields are required"
        });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(409).json({
            success:false,
            message: "User already exists"
        });
    }

    // password hash karo
    const hashedPassword = await bcrypt.hash(password, 10);

    // hashed password save karo
    const user = new User({
        username:name,
        email,
        password: hashedPassword
    });

    await user.save();

    res.status(201).json({
        success:true,
        message: "User registered successfully"
    });

});



app.get("/getTasks",Authenticate,async (req,res)=>{
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
})



app.get("/getTasks/:id",Authenticate,async (req,res)=>{
    const userId=req.user.id;
    const {id}=req.params;
    

    const tasks=await Task.find({createdBy:userId, _id:id});
    res.status(200).json({success:true,tasks});
})


app.put("/updateTask/:id",Authenticate,async (req,res)=>{
    const {id}=req.params;
    const userId=req.user.id;
    const {title,description,completed}=req.body;


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


    const updatedTask=await Task.findByIdAndUpdate(id,{title,description,completed,createdBy:userId},{returnDocument:'after'});

    res.status(200).json({success:true,message:"Task updated successfully"},updatedTask);
})

app.post("/logout",(req,res)=>{
    res.clearCookie("jwt");
    res.status(200).json({success:true,message:"User logged out successfully"});
})


app.delete("/deleteTask/:id",Authenticate,async (req,res)=>{

      
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

    res.status(200).json({success:true,message:"Task deleted successfully"});
})



app.post("/addTask",Authenticate,async (req,res)=>{

    const {title,description,completed=false}=req.body;


    if(!title || !description || !req.user.id){
        return res.status(400).json({success:false,message:"All fields are required"});
    }


    const task=new Task({title,description,completed,createdBy:req.user.id});
    await task.save();
    
    const ResponseTask=new TaskResponse(task);
    res.status(201).json({success:true,message:"Task added successfully",ResponseTask});
})





app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
