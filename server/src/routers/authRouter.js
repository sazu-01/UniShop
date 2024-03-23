
//import packages
import express from "express";

//import controller functions
import { LoginController , LogoutController } from "../controller/authController.js";

//create a express router 
const authRouter = express.Router();


authRouter.post("/login",LoginController);
authRouter.post("/logout",LogoutController);

export default authRouter;