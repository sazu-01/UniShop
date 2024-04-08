
//import package modules
import HttpError from "http-errors";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

//model
import Users from "../models/userModel.js";

//import helper functions
import { CreateJsonWebToken } from "../helpers/jwt.js";
import { SuccessResponse } from "../helpers/responseCode.js";

//environment variables
import { jwtAccessKey, jwtRefreshKey } from "../hiddenEnv.js";
import { SetAccessTokenCookie, SetRefreshTokenCookie } from "../helpers/setCookie.js";


const LoginController = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        //check the user is exist or not
        const user = await Users.findOne({ email });

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
        const accessToken = CreateJsonWebToken({ user }, jwtAccessKey, "10m");

        //set accessToken to cookie
        SetAccessTokenCookie(res,accessToken);

        //create a refresh token 
        const refreshToken = CreateJsonWebToken({ user }, jwtRefreshKey, "7d");

        //set refreshToken to cookie
        SetRefreshTokenCookie(res,refreshToken);

        //if all is well send success response
        return SuccessResponse(res, {
            statusCode: 200,
            message: "user login succesfully",
        })

    } catch (error) {
        next(error)
    }
}


const LogoutController = async (req, res, next) => {
    try {
        //clear the access token cookie
        res.clearCookie("accessToken");

        //clear the refresh token cookie
        res.clearCookie("refreshToken");

        //return successful response
        return SuccessResponse(res, {
            statusCode: 200,
            message: "user logged out successfully"
        })
    } catch (error) {
        next(error)
    }
}

const HandleRefreshToken = async (req, res, next) => {
    try {
        //get the refresh token from req cookie
        const oldRefreshToken = req.cookies.refreshToken;

        //verify the refresh token
        const decodedToken = Jwt.verify(oldRefreshToken, jwtRefreshKey);

        //if decoded token is null or empty
        if (!decodedToken) throw HttpError(404, "Invalid Refresh key, please login again");

          const id = decodedToken.user._id;
          const user = await Users.findById(id);
 
        //create a jwt access key
        const accessToken = CreateJsonWebToken({user}, jwtAccessKey, "10m");

        //set accessToken to cookie
        SetAccessTokenCookie(res,accessToken);

        return SuccessResponse(res, {
            statusCode: 200,
            message: "new access token generated",
        })
    } catch (error) {
        next(error);
    }
}

const HandleProtectedRoute = async (req, res, next) => {
  try {
    //get the acccess token from req cookies
     const accessToken = req.cookies.accessToken;

     //verify the access token 
     const decodedToken = Jwt.verify(accessToken,jwtAccessKey);

     //if decodedToken is emty throw an error
     if(!decodedToken) throw HttpError(401, "Invalid Access Token, please login again");

     return SuccessResponse(res,{
        statusCode: 200,
        message: "protected resource access successful"
     })

  } catch (error) {
    next(error);
  }
}



export { LoginController, LogoutController, HandleRefreshToken, HandleProtectedRoute }