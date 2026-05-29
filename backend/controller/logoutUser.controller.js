function logoutUser(req,res){
    try {
        res.clearCookie("jwt");
        res.status(200).json({success:true,message:"User logged out successfully"});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

export default logoutUser;