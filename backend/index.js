import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors';
import {connectDB} from './utils/db.js'
import Authenticate from './middleware/auth.middleware.js'
import Interceptor from './middleware/interceptor.middleware.js'
import authRouter from './routes/auth.routes.js'
import taskRouter from './routes/task.routes.js'
import userRouter from './routes/user.routes.js';
import resetRouter from './routes/reset.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


console.log(__filename);


dotenv.config();

const PORT=process.env.PORT || 4040;




const app=express();
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:8080',
        'http://localhost:5174'
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(cookieParser());
app.use(rateLimit(
    {
        windowMs: 1000 * 60,
        max: 30,
        message: "Too many requests, please try again later",
    }
));


connectDB();
app.use(Interceptor);

app.use(express.static(path.join(__dirname,"frontend","dist")));




app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/auth",authRouter);
app.use("/task",Authenticate,taskRouter);
app.use("/user",Authenticate,userRouter);
app.use("/reset",resetRouter);

app.get("/health",(req,res)=>{
    res.status(200).json({success:true,message:"ok"});
})



const frontendPath = path.resolve(__dirname, '../frontend/dist');

app.use(express.static(frontendPath));


app.use((req,res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
