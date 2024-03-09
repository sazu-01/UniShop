
//package module
import express from "express";

//file module
import { HandleAllUsers } from "../controller/userController.js";

//make an express router
const userRouter = express.Router();

//define route for all users
userRouter.get("/api/users",HandleAllUsers);


export default userRouter