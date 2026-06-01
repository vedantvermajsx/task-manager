function logoutUser(req,res){
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        res.status(200).json({success:true,message:"User logged out successfully"});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

export default logoutUser;