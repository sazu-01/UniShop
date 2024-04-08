"use strict";

//packages
import HttpError from "http-errors";
import Jwt from "jsonwebtoken";
import mongoose from "mongoose";

//model
import Users from "../models/userModel.js";

//helper functions
import { CreateJsonWebToken } from "../helpers/jwt.js";
import { ErrorResponse, SuccessResponse } from "../helpers/responseCode.js";
import ProcessEmail from "../helpers/ProcessEmail.js";

import { defaultImageForUser } from "../hiddenEnv.js";

//environment variables
import { clientUrl, jwtPrivateKey } from "../hiddenEnv.js";

//services functions
import {
  FindUsersService,
  FindOneService,
  deleteOneService,
  banOrUnbanService,
  ForgetPassowrdService,
  ResetPasswordService,
  UpdateUserService,
} from "../services/userServices.js";

const GetAllUsers = async (req, res, next) => {
  try {
    //destructure the search page and limit from the parameters
    const { limit = 10, page = 1, search = "" } = req.query;

    //destructure the value from the result of the FindUsersService function
    const { users, pagination } = await FindUsersService(
      { limit, page, search },
      Users
    );

    //successfully back all the users from database
    return SuccessResponse(res, {
      statusCode: 200,
      message: "return all the users",
      payload: {
        users,
        pagination,
      },
    });
  } catch (error) {
    next(error);
  }
};

const GetSingleUserByID = async (req, res, next) => {
  try {
    //get id from request params
    const id = req.params.id;

    //set options to exclude password field
    const options = { password: 0 };

    //get singleUser value fron FindOneSevice function
    const singleUser = await FindOneService(Users, id, options);

    //if user not found, throw an error
    if (!singleUser) {
      throw HttpError(404, "User with this id does not exist");
    }

    //return the response with the user
    return SuccessResponse(res, {
      message: "return a single user by id",
      payload: { singleUser },
    });
  } catch (error) {
    next(error);
  }
};

const RegisterProcess = async (req, res, next) => {
  try {
    //destructure name email phone and password from req.body
    const { name, email, phone, password, address } = req.body;

    //get the image from req file or set the default image
    const image = req.file ? req.file.path : defaultImageForUser;

    //check if a user with the provided email already exists
    const existingUserViaEmail = await Users.exists({ email: email });
    if (existingUserViaEmail) {
      throw HttpError(422, "User with this email already exist. please login");
    }

    //check if a user with the provided phone number already exist
    const existingUserViaPhone = await Users.exists({ phone: phone });
    if (existingUserViaPhone) {
      throw HttpError(
        422,
        "already have a user with this number try another number"
      );
    }

    //make an user object with data
    const userData = { name, email, phone, password, address, image };

    //create a json web token for the new user
    const token = CreateJsonWebToken(userData, jwtPrivateKey, "10m");

    //prepare an email data
    const emailData = {
      name,
      email,
      subject: "Activation Email From UniShop",
      html: `
            <h2>Hello ${name}</h2>
            <p>please click on the following link to activate your email</p>
            <a href="${clientUrl}/api/users/activate/${token}" target="blank">
            activate account</a>`,
    };

    //Process of Email
    ProcessEmail(emailData);

    // send a response with a message and the generated token
    return SuccessResponse(res, {
      message: `please go to your email and click on the 
                      given link to activate your email`,
      payload: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const CompleteUserRegister = async (req, res, next) => {
  try {
    //get the token from request body
    const token = req.body.token;

    //if token not provided the thow error
    if (!token) throw HttpError(404, "Token is not found");

    //verify token using the jwt private key
    const decode = Jwt.verify(token, jwtPrivateKey);

    //if the token is invalid or expired throw and error
    if (!decode) throw HttpError(404, "user information not found");

    //create a new user document in the database using the decoded user information
    await Users.create(decode);

    //send a success response
    return SuccessResponse(res, {
      message: "user registered successfully",
    });
  } catch (error) {
    //handle specific token related error
    if (error.name === "TokenExpiredError") {
      throw HttpError(401, "Token has expired");
    } else if (error.name === "JsonWebTokenError") {
      throw HttpError(401, "Invalid Token");
    } else {
      //pass other error to next middlewares
      next(error);
    }
  }
};

const ForgetPasswordController = async (req, res, next) => {
  try {
    //get the email from req body
    const { email } = req.body;

    //if email is not given
    if (!email) throw HttpError("please input email");

    //call the ForgetPassowrdService function with the Users model and the email
    const token = await ForgetPassowrdService(Users, email);

    //return the response
    return SuccessResponse(res, {
      statusCode: 200,
      message: `please go to your ${email} email to reset password`,
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};

const ResetPasswordCntroller = async (req, res, next) => {
  try {
    //extract the token and password from the request body
    const { token, password } = req.body;

    //if token not found throw an error
    if (!token) throw HttpError(404, "Token not found");

    //call the ResetPasswordService function with the token and password
    ResetPasswordService(token, password);

    //return the response
    return SuccessResponse(res, {
      statusCode: 200,
      message: "password reset successfull",
    });
  } catch (error) {
    next(error);
  }
};

const UpdateUserByID = async (req, res, next) => {
  try {
    //destructure name email and password from request body and image from file
    const { name, phone, address } = req.body;
    const image = req.file?.path;

    //if all the fileds are empty throw an error
    if (!name || phone || address || image) {
      throw HttpError(404, "please input data");
    }
    //get the id from request params
    const id = req.params.id;

    //call the UpdateUserService function
    const updateUser = await UpdateUserService({
      name,
      phone,
      address,
      image,
      id,
    });

    //send a successful res
    return SuccessResponse(res, {
      message: "update user succesfully",
      payload: { updateUser },
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      ErrorResponse(res, {
        statusCode: 400,
        message: "invalid id",
      });
    } else {
      next(error);
    }
  }
};

const BannedUserByID = async (req, res, next) => {
  try {
    //get the id from req params
    const userId = req.params.id;

    //define the updates object to set the isBanned field to true
    const updates = { isBanned: true };

    //call the banOrUnbanService to update the user's banned status
    const bannedUser = await banOrUnbanService(Users, userId, updates);

    //return success response
    return SuccessResponse(res, {
      statusCode: 200,
      message: "user is banned",
      payload: { bannedUser },
    });
  } catch (error) {
    next(error);
  }
};

const UnBannedUserByID = async (req, res, next) => {
  try {
    //get the id from req params
    const userId = req.params.id;

    //define the updates object to set the isBanned field to true
    const updates = { isBanned: false };

    //call the banOrUnbanService to update the user's banned status
    const unbannedUser = await banOrUnbanService(Users, userId, updates);

    //return success response
    return SuccessResponse(res, {
      statusCode: 200,
      message: "user is unbanned",
      payload: { unbannedUser },
    });
  } catch (error) {
    next(error);
  }
};

const DeleteUserByID = async (req, res, next) => {
  try {
    //get the id from request params
    const id = req.params.id;

    //get the deleted userfrom the deleteOneService function
    const deletedUser = await deleteOneService(id, Users);

    //send successful response with the deleted user
    return SuccessResponse(res, {
      message: "delete user successfully",
      payload: {
        deletedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export {
  GetAllUsers,
  GetSingleUserByID,
  RegisterProcess,
  CompleteUserRegister,
  ForgetPasswordController,
  ResetPasswordCntroller,
  UpdateUserByID,
  BannedUserByID,
  UnBannedUserByID,
  DeleteUserByID,
};
