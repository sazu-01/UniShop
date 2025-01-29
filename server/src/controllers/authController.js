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
import {
  SetAccessTokenCookie,
  SetRefreshTokenCookie,
} from "../helpers/setCookie.js";

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
      throw HttpError(403, "you are banned , please contact to authority");
    }

    //create a jwt refresh token
    const refreshToken = CreateJsonWebToken({ user }, jwtRefreshKey, "10d");

    //set refresh token
    SetRefreshTokenCookie(res, refreshToken);

    //create a jwt access key
    const accessToken = CreateJsonWebToken({ user }, jwtAccessKey, "15m");

    //set accessToken to cookie
    SetAccessTokenCookie(res, accessToken);

    //if all is well send success response
    return SuccessResponse(res, {
      statusCode: 200,
      message: "user login succesfully",
    });
  } catch (error) {
    next(error);
  }
};

const LogoutController = async (req, res, next) => {
  try {
      // Clear refresh token with proper options
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/'
    });

    //Clear access token with proper options
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/'
    });

    //return successful response
    return SuccessResponse(res, {
      statusCode: 200,
      message: "user logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};


const HandleRefreshToken = async (req, res, next) => {
  try {
    //get the refresh token from req cookie
    const oldRefreshToken = req.cookies.refreshToken;

    if (!oldRefreshToken) {
      throw HttpError(401, "no refres token found, please login");
    }

    //verify the refresh token
    let decodedToken;
    try {
      decodedToken = Jwt.verify(oldRefreshToken, jwtRefreshKey);
    } catch (error) {
      if (error instanceof Jwt.TokenExpiredError) {
        throw HttpError(401, "token is expired please login");
      }
      throw (401, "invalid refreshToken please login");
    }

    //find user from decodedToken
    const id = decodedToken.user._id;
    const user = await Users.findById(id);

    //create a jwt access key
    const accessToken = CreateJsonWebToken({ user }, jwtAccessKey, "15m");

    //set accessToken to cookie
    SetAccessTokenCookie(res, accessToken);

    return SuccessResponse(res, {
      statusCode: 200,
      message: "new access token generated",
    });
  } catch (error) {
    next(error);
  }
};


const GetCurrentUserController = async (req, res, next) => {
    try {
      // Get the access token from req cookies
      const accessToken = req.cookies.accessToken;
  
      // If there's no access token, throw an error
      if (!accessToken) {
        throw HttpError(401, "No access token found, please login");
      }
  
      // Verify the access token
      const decodedToken = Jwt.verify(accessToken, jwtAccessKey);
  
      // If decodedToken is empty throw an error
      if (!decodedToken) {
        throw HttpError(401, "Invalid Access Token, please login again");
      }
  
      // Get the user ID from the decoded token
      const userId = decodedToken.user._id;
  
      // Find the user and remove password 
      const user = await Users.findById(userId).select("-password");
  
      // If user not found, throw an error
      if (!user) {
        throw HttpError(404, "User not found");
      }
  
      // Return the user data
      return SuccessResponse(res, {
        statusCode: 200,
        message: "User data retrieved successfully",
        payload: { user },
      });
    } catch (error) {
      next(error);
    }
  };


const HandleProtected = async (req, res, next) => {
    try {
      const accessToken = req.cookies.accessToken;
      
      //if no access token founds
      if(!accessToken) throw HttpError(422, "No access token found, please login")
      
      //verify the token
      const decodedToken = Jwt.verify(accessToken, jwtAccessKey);
  
      //if token is invalid
      if(!decodedToken) {
        throw HttpError(422, "Invalid access token, Please login again")
      }
  
      return SuccessResponse(res,{
        statusCode : 200,
        message : "protected resources accessed successfully",
      })
    } catch (error) {
      next(error)
    }
  }

export {
  LoginController,
  LogoutController,
  GetCurrentUserController,
  HandleRefreshToken,
  HandleProtected
};
