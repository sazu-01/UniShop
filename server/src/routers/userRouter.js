"use strict";

//package
import express from "express";

//middlewares
import { uploadUserImg } from "../middlewares/uploadFile.js";

//controller functions
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
  ResetPasswordCntroller,
} from "../controllers/userController.js";

//middlewares
import {
  IsAdmin,
  IsLoggedIn,
  IsLoggedOut,
} from "../middlewares/authMiddleware.js";

//import validation
import { validateUserRegistration } from "../validation/userValidation.js";
import RunValidation from "../validation/index.js";

//make an express router
const userRouter = new express.Router();

//define different routes for users
userRouter.get("/all-user", IsLoggedIn, IsAdmin, GetAllUsers);

userRouter.get("/single-user/:id", IsLoggedIn, IsAdmin, GetSingleUserByID);

userRouter.post(
  "/register-process",
  uploadUserImg.single("image"),
  validateUserRegistration,
  RunValidation,
  IsLoggedOut,
  RegisterProcess
);

userRouter.post("/complete-register", IsLoggedOut, CompleteUserRegister);

userRouter.post("/forget-password", ForgetPasswordController);

userRouter.put("/reset-password", ResetPasswordCntroller);

userRouter.put(
  "/update-user/:id",
  uploadUserImg.single("image"),
  IsLoggedIn,
  UpdateUserByID
);

userRouter.put("/ban-user/:id", IsLoggedIn, IsAdmin, BannedUserByID);

userRouter.put("/unban-user/:id", IsLoggedIn, IsAdmin, UnBannedUserByID);

userRouter.delete("/delete-user/:id", IsLoggedIn, IsAdmin, DeleteUserByID);

export default userRouter;
