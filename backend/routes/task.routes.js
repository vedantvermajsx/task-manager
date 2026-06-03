import { Router } from "express";
import addTask from "../controller/addTasks.controller.js";
import deleteTask from "../controller/deleteTask.controller.js";
import getTasks from "../controller/getTask.controller.js";
import updateTask  from "../controller/updateTask.controller.js";
import dayVerification from "../middleware/dayVerification.middleware.js";

const taskRouter=Router();

taskRouter.post("/addTask",addTask);
taskRouter.delete("/deleteTask/:id",dayVerification,deleteTask);
taskRouter.get("/getTasks",getTasks);
taskRouter.put("/updateTask/:id",dayVerification,updateTask);

export default taskRouter;