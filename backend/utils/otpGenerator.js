import crypto from "crypto";
function generateOtp(){
    return Math.floor(10000000 + Math.random() * 90000000);
}

function generateToken(){
    return crypto.randomBytes(32).toString("hex");
}

export {generateOtp,generateToken};