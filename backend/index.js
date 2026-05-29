import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors';
import {connectDB} from './utils/db.js'
import Authenticate from './middleware/auth.middleware.js'
import Interceptor from './middleware/interceptor.middleware.js'
import authRouter from './routes/auth.routes.js'
import taskRouter from './routes/task.routes.js'


dotenv.config();

const PORT=process.env.PORT || 4040;


const app=express();
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://localhost:5174"
    ],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json()); 

connectDB();
app.use(Interceptor);



app.use("/auth",authRouter);
app.use("/task",Authenticate,taskRouter);


app.get("/health",(req,res)=>{
    res.status(200).json({success:true,message:"ok"});
})


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
