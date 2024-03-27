
//import package modules
import HttpError from "http-errors";
import bcrypt from "bcryptjs";

//model
import Users from "../models/userModel.js";

//import helper functions
import { CreateJsonWebToken } from "../helper/jwt.js";
import { SuccessResponse } from "../helper/responseCode.js";

//environment variables
import { jwtAccessKey } from "../hiddenEnv.js";


const LoginController = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        //check the user is exist or not
        const user = await Users.findOne({email});

        //if user does not exist 
        if (!user) {
            throw HttpError(404, "user does not exist , please register");
        }

        //check the given password match or not 
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        //if password does not match throw error
        if (!isPasswordMatch) {
            throw HttpError(401, "passowrd is wrong");
        }

        //if user banned
        if (user.isBanned) {
            throw HttpError(403, "you are banned , please contact to authority")
        }

        //create a jwt access key
        const accessJwToken = CreateJsonWebToken({user},jwtAccessKey,"15m");

        //set a cookie
        res.cookie("accessToken",accessJwToken,{
            maxAge : 15 * 60 * 1000, //15 minutes
            httpOnly: true,
            secure: true,
            sameSite: false
        })

        //if all is well send success response
        return SuccessResponse(res, {
            statusCode: 200,
            message: "user login succesfully",
            payload: {
                user
            }
        })



    } catch (error) {
        next(error)
    }
}


const LogoutController = async (req , res , next) => {
   try {
      //clear the cookie
      res.clearCookie("accessToken");

      //return successful response
      return SuccessResponse(res,{
        statusCode: 200,
        message: "user logged out successfully"
      })
   } catch (error) {
     next(error)
   }
}

export { LoginController , LogoutController}