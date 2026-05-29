import { Router } from "express";
import Authenticate from "../middleware/auth.middleware.js";
import updateUser from "../controller/updateUser.controller.js";
import updateProfilePic from "../controller/updateProfile.controller.js";

const userRouter = Router();

userRouter.put("/update/:id", Authenticate,updateUser);
userRouter.put("/update-profile/:id", Authenticate,updateProfilePic);

export default userRouter;