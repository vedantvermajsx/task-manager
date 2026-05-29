import User from "../models/User.model.js";
import UserResponse from "../models/UserResponse.model.js";


async function authenticateUser(req,res){
    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const ResponseUser = new UserResponse(user);

        res.status(200).json({
            success: true,
            ResponseUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export default authenticateUser;