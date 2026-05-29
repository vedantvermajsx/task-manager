import User from "../models/User.model.js";
import bcrypt from "bcrypt";


async function registerUser(req,res){
    
    try {

        const { name, email, password } = req.body;
        console.log(name,email,password);
        if (!name || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if(!verifyEmail(email)){
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            });
        }

        if(name.length<3 || name.length>50){
            return res.status(400).json({
                success: false,
                message: "Name must be between 3 and 50 characters"
            });
        }

        if(password.length<8){
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long"
            });
        }

        if(password.length>100){
            return res.status(400).json({
                success: false,
                message: "Password must be at most 100 characters long"
            });
        }

        if(email.length<3 || email.length>50){
            return res.status(400).json({
                success: false,
                message: "Email must be between 3 and 50 characters"
            });
        }

        if(name.length>50){
            return res.status(400).json({
                success: false,
                message: "Name must be at most 50 characters long"
            });
        }



        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(409).json({
                success: false,
                message: "User already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username: name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}


function verifyEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


export default registerUser;