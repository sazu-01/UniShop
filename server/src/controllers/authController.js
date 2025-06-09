//import package modules
import HttpError from "http-errors";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { NODE_ENV } from "../hiddenEnv.js";

//model
import Users from "../models/userModel.js";

//import helper functions
import { SuccessResponse } from "../helpers/responseCode.js";

//environment variables
import { jwtAccessKey } from "../hiddenEnv.js";


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
  
    //create a jwt access key
    const expiryDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000); // 10 days
    
    const accessToken = Jwt.sign({user}, jwtAccessKey);
    console.log(accessToken);
    
    const {...rest } = user._doc;

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: NODE_ENV === "production", // only secure in production
        sameSite: NODE_ENV === "production" ? "None" : "Lax", // for cross-site cookies in production
        expires: expiryDate,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const LogoutController = async (req, res, next) => {
  try {
 

    //Clear access token with proper options
    res.clearCookie('accessToken', {
        httpOnly: true,

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
       console.log(decodedToken);
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





export {
  LoginController,
  LogoutController,
  GetCurrentUserController,
};