import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/token.js";
import UserResponse from "../models/UserResponse.model.js";


async function loginUser(req,res){  
        try {
    
            const { email, password } = req.body;
    
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }
    
            const user = await User.findOne({ email });
    
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
    
            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );
    
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid password"
                });
            }
    
            const token = generateToken(user);
    
            res.cookie("jwt", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                maxAge: 24 * 60 * 60 * 1000
            });
    
            const ResponseUser = new UserResponse(user);
    
            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                ResponseUser
            });
    
        } catch (error) {
    
            res.status(500).json({
                success: false,
                message: error.message
            });
    
        }
    
    }

    export default loginUser;