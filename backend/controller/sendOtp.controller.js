import Otp from "../models/Otp.model.js";
import User from "../models/User.model.js";
import {generateOtp,generateToken} from "../utils/otpGenerator.js";
import emailJs from "../utils/emailJs.js";

async function sendOtp(req,res){
    const {email}=req.body;

    const user=await User.findOne({email});
    if(!user){
        return res.status(404).json({message:"User not found"});
    }


    const otpData=await Otp.findOne({email});
    if(otpData){
        await emailJs.sendOtp(email,otpData.otp);
        return res.status(200).json({message:"Otp sent"});
    }

    try{

    const otp=generateOtp();
    
    const otpData=new Otp({email,otp,token:generateToken()});
    await otpData.save();
    await emailJs.sendOtp(email,otp);
}
    catch(error){
        return res.status(500).json({message:"Internal server error"});
    }


    return res.status(200).json({message:"Otp sent successfully"});
}

export default sendOtp;
