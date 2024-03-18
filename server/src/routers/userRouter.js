
//imprt package modules
import express from "express";

//import controller functions
import { GetAllUsers, GetSingleUserByID, RegisterProcess, CompleteUserRegister, UpdateUserByID, DeleteUserByID } from "../controller/userController.js";

//make an express router
const userRouter = new express.Router();

//define different routes for users
userRouter.get("/all-user", GetAllUsers);
userRouter.get("/:id", GetSingleUserByID);
userRouter.post("/register-process", RegisterProcess);
userRouter.post("/complete-register", CompleteUserRegister);
userRouter.put("/:id", UpdateUserByID);
userRouter.delete("/:id", DeleteUserByID);


export default userRouter;