import Otp from "../models/Otp.model.js";
import User from "../models/User.model.js";

async function verifyOtp(req,res){
    const {email,otp}=req.body;

    const otpData=await Otp.findOne({email});

    
    const user=await User.findOne({email});
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    

    if(!otpData){
        return res.status(404).json({message:"Otp expired"});
    }

    if(otpData.otp!==otp){
        return res.status(400).json({message:"Invalid Otp"});
    }
    if(otpData.expiresAt<Date.now()){
        return res.status(400).json({message:"Otp expired"});
    }


    return res.status(200).json({
        success:true,
        message:"Otp verified successfully",
        token:otpData.token
    });
}

export default verifyOtp;
    
