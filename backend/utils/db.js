import mongoose from "mongoose";


async function connectDB(){
    const URI=process.env.MONGODB_URI;
    await mongoose.connect(URI).then(()=>{
        console.log('Connected to MongoDB');
    }).catch((err)=>{
        console.log(err);
        process.exit(1);
    })
}

async function disConnect(){
    await mongoose.disconnect().then(()=>{
        console.log('Disconnected from MongoDB');
    }).catch((err)=>{
        console.log(err);
        process.exit(1);
    })
}

export {connectDB,disConnect}
