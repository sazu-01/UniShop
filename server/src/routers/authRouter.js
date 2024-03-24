"use strict"

//import packages
import express from "express";

//import controller functions
import { LoginController , LogoutController } from "../controller/authController.js";
import { IsLoggedIn, IsLoggedOut } from "../middlewares/authMiddleware.js";

//create a express router 
const authRouter = express.Router();


authRouter.post("/login",IsLoggedOut, LoginController);
authRouter.post("/logout",IsLoggedIn, LogoutController);

export default authRouter;