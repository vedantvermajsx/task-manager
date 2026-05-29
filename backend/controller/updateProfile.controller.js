import User from "../models/User.model.js";

async function updateProfilePic(req,res){
    try {
        const {id}=req.params;
        const {url}=req.body;
        const {userId}=req.user;

        if(id!=userId){
            return res.status(401).json({success:false,message:"Malformed request"});
        }

        if(!url){
            return res.status(400).json({success:false,message:"No url provided"});
        }
        
        const updatedUser=await User.findByIdAndUpdate(id, { $set: { avatar: url } }, { returnDocument: 'after' });

        if(!updatedUser){
            return res.status(404).json({success:false,message:"User not found"});
        }

        return res.status(200).json({success:true,message:"User updated successfully", user: updatedUser});
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}

export default updateProfilePic;