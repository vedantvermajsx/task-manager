import { Router } from "express";
import addTask from "../controller/addTasks.controller.js";
import deleteTask from "../controller/deleteTask.controller.js";
import getTasks from "../controller/getTask.controller.js";
import updateTask  from "../controller/updateTask.controller.js";

const taskRouter=Router();

taskRouter.post("/addTask",addTask);
taskRouter.delete("/deleteTask/:id",deleteTask);
taskRouter.get("/getTasks",getTasks);
taskRouter.put("/updateTask/:id",updateTask);

export default taskRouter;