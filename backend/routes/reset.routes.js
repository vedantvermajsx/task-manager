import { Router } from "express";
import sendOtp from "../controller/sendOtp.controller.js";
import verifyOtp from "../controller/verifyOtp.controller.js";
import updatePassword from "../controller/updatePassword.controller.js";

const resetRouter=Router();

resetRouter.post("/send-otp",sendOtp);
resetRouter.post("/verify-otp",verifyOtp);
resetRouter.post("/update-password",updatePassword);

export default resetRouter;