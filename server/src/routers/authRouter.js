"use strict"

//import packages
import express from "express";

//import controller functions
import { 
    LoginController, 
    LogoutController, 
    HandleRefreshToken,
    HandleProtectedRoute } 
from "../controller/authController.js";

//import middleware functions
import { IsLoggedIn, IsLoggedOut } from "../middlewares/authMiddleware.js";

//create a express router 
const authRouter = express.Router();


authRouter.post("/login", IsLoggedOut, LoginController);
authRouter.post("/logout", IsLoggedIn, LogoutController);
authRouter.get("/refresh-token", HandleRefreshToken);
authRouter.get("/protected-route",HandleProtectedRoute);

export default authRouter;