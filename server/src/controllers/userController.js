"use strict";

//packages
import HttpError from "http-errors";
import mongoose from "mongoose";

//model
import Users from "../models/userModel.js";

//helper functions
import { ErrorResponse, SuccessResponse } from "../helpers/responseCode.js";


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
import User from "../models/userModel.js";


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

    //if any fileds are not inputted throw an error
    if (!name && !phone && !address && !image) {
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
  ForgetPasswordController,
  ResetPasswordCntroller,
  UpdateUserByID,
  BannedUserByID,
  UnBannedUserByID,
  DeleteUserByID,
};
