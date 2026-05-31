import { Router } from "express";
import Authenticate from "../middleware/auth.middleware.js";
import updateUser from "../controller/updateUser.controller.js";
import updateProfilePic from "../controller/updateProfilePic.controller.js";
import upload from "../middleware/upload.middleware.js";

const userRouter = Router();

userRouter.put("/update/:id", Authenticate,updateUser);
userRouter.put(
  "/update-profile/:id",
  Authenticate,
  upload.single("profilePic"),
  updateProfilePic
);

export default userRouter;