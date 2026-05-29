import { Router } from "express";
import loginUser from "../controller/loginUser.controller.js";
import registerUser from "../controller/registerUser.controller.js";
import authenticateUser from "../controller/authenticateUser.controller.js";
import Authenticate from "../middleware/auth.middleware.js";
import logoutUser from "../controller/logoutUser.controller.js";

const authRouter = Router();



authRouter.get("/me", Authenticate,authenticateUser);  
authRouter.post("/login",loginUser);
authRouter.post("/register",registerUser);
authRouter.post("/logout",logoutUser);

export default authRouter;