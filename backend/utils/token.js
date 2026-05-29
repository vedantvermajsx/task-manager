import jwt from "jsonwebtoken";

function generateToken(user){
    const JWT_SECRET=process.env.JWT_SECRET;
    return jwt.sign({id:user._id},JWT_SECRET,{expiresIn:"1d"});
}


export default generateToken;