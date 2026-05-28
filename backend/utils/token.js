import jwt from "jsonwebtoken";


const JWT_SECRET=process.env.JWT_SECRET;


function generateToken(user){
    return jwt.sign({id:user._id},JWT_SECRET,{expiresIn:"1d"});
}


export default generateToken;