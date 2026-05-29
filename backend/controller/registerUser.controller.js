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
        
        if(!verifyName(name)){
            return res.status(400).json({
                success: false,
                message: "Invalid name"
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

function verifyName(name){
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
}

export default registerUser;