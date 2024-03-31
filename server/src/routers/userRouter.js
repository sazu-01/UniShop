"use strict";

//imprt package modules
import express from "express";

//middlewares
import upload from "../middlewares/uploadImage.js";

//import controller functions
import { 
    GetAllUsers, 
    GetSingleUserByID, 
    RegisterProcess, 
    CompleteUserRegister, 
    UpdateUserByID,
    BannedUserByID,
    UnBannedUserByID,
    DeleteUserByID, 
    ForgetPasswordController,
    ResetPasswordCntroller
} from "../controller/userController.js";

//import authentication middleware
import { IsAdmin, IsLoggedIn, IsLoggedOut } from "../middlewares/authMiddleware.js";

//make an express router
const userRouter = new express.Router();

//define different routes for users
userRouter.get("/all-user", IsLoggedIn , IsAdmin , GetAllUsers);
userRouter.get("/single-user/:id",IsLoggedIn, IsAdmin , GetSingleUserByID);
userRouter.post("/register-process",upload.single("image"), IsLoggedOut, RegisterProcess);
userRouter.post("/complete-register",IsLoggedOut, CompleteUserRegister);
userRouter.post("/forget-password",ForgetPasswordController);
userRouter.put("/reset-password",ResetPasswordCntroller);
userRouter.put("/update-user/:id",IsLoggedIn, IsAdmin, UpdateUserByID);
userRouter.put("/ban-user/:id",IsLoggedIn, IsAdmin, BannedUserByID);
userRouter.put("/unban-user/:id",IsLoggedIn, IsAdmin, UnBannedUserByID);
userRouter.delete("/delete-user/:id",IsLoggedIn, IsAdmin, DeleteUserByID);


export default userRouter;