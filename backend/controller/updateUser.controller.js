import User from "../models/User.model.js";

async function updateUser(req,res){
    try {
        const {id}=req.params;
        const userId=req.user.id;
        
        const name=req.body.username;
        const description=req.body.bio;

        


        if(userId != id){
            return res.status(401).json({success:false,message:"Malformed request"});
        }


        if(req.body.email || req.body.password){
            return res.status(400).json({success:false,message:"Cannot update email or password through this route"});
        }

        



        if(!id || !userId){
            return res.status(400).json({success:false,message:"User not found"});
        }
        

        const updateFields = {};

        if (name !== undefined) {
            if (name.length < 3 || name.length > 50) {
                return res.status(400).json({success:false,message:"Name must be between 3 and 50 characters"});
            }
            updateFields.username = name;
        }


        if (description !== undefined) {
            if (description.length > 500) {
                return res.status(400).json({success:false,message:"Description must be less than 500 characters"});
            }
            updateFields.description = description;
        }

        
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({success:false,message:"No valid fields provided for update"});
        }

        const user=await User.findById(id);

        
        if(!user){
            return res.status(404).json({success:false,message:"User not found"});
        }

        if(user.id!=userId){
            return res.status(401).json({success:false,message:"Unauthorized"});
        }


        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            { returnDocument: 'after' }
        );

     
   
        res.status(200).json({success:true,message:"User updated successfully", user: updatedUser});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

export default updateUser;