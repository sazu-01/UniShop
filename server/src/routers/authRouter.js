"use strict"

//import packages
import express from "express";

//import controller functions
import { 
    LoginController, 
    LogoutController, 
    GetCurrentUserController,
    HandleRefreshToken
 } 
from "../controllers/authController.js";

//import middleware functions
import { IsLoggedIn, IsLoggedOut } from "../middlewares/authMiddleware.js";

//validation
import { validateUserLogin } from "../validation/userValidation.js";
import RunValidation from "../validation/index.js";

//create a express router 
const authRouter = express.Router();


authRouter.post("/login",validateUserLogin, RunValidation, IsLoggedOut, LoginController);
authRouter.post("/logout", IsLoggedIn, LogoutController);
authRouter.get('/current-user', GetCurrentUserController);
authRouter.get("/refresh-token", HandleRefreshToken);
export default authRouter;