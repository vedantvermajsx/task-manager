import User from "../models/User.model.js";
import Otp from "../models/Otp.model.js";
import hashPassword from "../utils/passwordHash.js";

async function updatePassword(req,res){
    const {email,token,password}=req.body;

    const otpData=await Otp.findOne({email,token});
    if(!otpData){
        return res.status(404).json({success:false,message:"Otp expired"});
    }
    
    if(otpData.expiresAt<Date.now()){
        return res.status(400).json({success:false,message:"Otp expired"});
    }

    const hashedPassword=await hashPassword(password);

    const user =await User.findOneAndUpdate({email},{$set:{password:hashedPassword}},{'returnDocument':'after'});


    if(!user) return res.status(404).json({success:false,message:"User not found"});

    await Otp.deleteOne({email});
    return res.status(200).json({success:true,message:"password changed sucessfully"});
}

export default updatePassword;