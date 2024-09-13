"use strict";

//packages
import HttpError from "http-errors";
import mongoose from "mongoose";
import Jwt from "jsonwebtoken";

//helper functions
import { CreateJsonWebToken } from "../helpers/jwt.js";
import ProcessEmail from "../helpers/processEmail.js";
import {
  deleteFileFromCloudinary,
  publicIdWithouthExtensionFromUrl,
} from "../helpers/cloudinaryHelper.js";

//model
import Users from "../models/userModel.js";

//env varaiable
import {
  resetPasswordKey,
  clientUrl,
  defaultImageForUser,
} from "../hiddenEnv.js";
import cloudinary from "../config/cloudinary.js";

export const FindUsersService = async ({ limit, page, search }, Users) => {
  try {
    //convert page and limit to numbers
    const pageNum = Number(page);
    const limitNum = Number(limit);

    //define the search regex pattern
    const searchPattern = `.*${search}.*`;

    // Define the filter for the database query
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: new RegExp(searchPattern, "i") } },
        { email: { $regex: new RegExp(searchPattern, "i") } },
        { password: { $regex: new RegExp(searchPattern, "i") } },
      ],
    };

    //set password to false
    const options = { password: 0 };

    //get all the users from database
    const users = await Users.find(filter, options)
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum);

    //countDocuments for all the filter user
    const count = await Users.find(filter).countDocuments();

    //if no user found , throw an error
    if (!users) throw HttpError(404, "no user found");

    //calculate the totalNumbers of page
    const totalPages = Math.ceil(count / limitNum);

    //reutrn the users and pagination
    return {
      users,
      pagination: {
        totalPages,
        currentPage: pageNum,
        previousPage: pageNum - 1 ? pageNum - 1 : null,
        nextPage: pageNum < totalPages ? pageNum + 1 : null,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const FindOneService = async (Users, id, options) => {
  try {
    //find the user by its ID in the given Model
    const user = await Users.findById(id, options);

    //if no user is found, throw a 404 HTTP error
    if (!user) {
      throw HttpError(404, "user does not exist with this id");
    }

    //return the user
    return user;
  } catch (error) {
    //if mongoose error then throw a 404 HTTP error
    if (error instanceof mongoose.Error) {
      throw HttpError(404, "invalid id");
    }
    throw error;
  }
};

export const deleteOneService = async (id, Users) => {
  try {
    //find the user by id
    const user = await FindOneService(Users, id);

    //if user doesn't exist
    if (!user) throw HttpError(400, "user is not found");

    //if user an admin
    if (user.isAdmin)
      throw HttpError(400, "user is an admin , admin can't be delete");

    //access current image of user 
    const userCurrentImage = user.image;

    // delete user image if the image not default
    if (userCurrentImage !== defaultImageForUser) {
      const publicId = await publicIdWithouthExtensionFromUrl(userCurrentImage);
      deleteFileFromCloudinary("unishop/images/users", publicId);
    }

    // delete the non-admin user
    await user.deleteOne();

    //return the deleted user
    return user;
  } catch (error) {
    throw error;
  }
};

export const banOrUnbanService = async (Users, userId, updates) => {
  try {
    //find a user with id
    await FindOneService(Users, userId);

    // Options for the update operation
    const updateOptions = {
      new: true,
      runValidators: true,
      context: "query",
    };

    //find and update the user document withouth password field
    const updateUser = await Users.findByIdAndUpdate(
      userId,
      updates,
      updateOptions
    ).select("-password");

    //if the update operation didn't find a user, throw an error
    if (!updateUser) {
      throw HttpError(404, "use is not banned");
    }

    return updateUser;
  } catch (error) {
    throw error;
  }
};

export const ForgetPassowrdService = async (Users, email) => {
  try {
    //find the user with provided email
    const user = await Users.findOne({ email });

    //if no user has found
    if (!user) throw HttpError(404, "email is not verified, please register");

    //create jsonwebtoken for resetpassword controller
    const token = CreateJsonWebToken({ email }, resetPasswordKey, "7m");

    //prepare an email
    const emailData = {
      email,
      subject: "Reset Password Email",
      html: `
                 <h2>Hello ${user.name}</h2>
                 <p>please click on the following link to reset your password</p>
                 <a href="${clientUrl}/api/users/reset-password/${token}" target="blank">
                 reset password</a>`,
    };

    //send verification email
    ProcessEmail(emailData);

    return token;
  } catch (error) {
    throw error;
  }
};

export const ResetPasswordService = async (token, password) => {
  try {
    //verify the provided token using the resetPasswordKey
    const decoded = Jwt.verify(token, resetPasswordKey);

    //if the token is invalid or expired, throw a 400 bad request error
    if (!decoded) throw HttpError(403, "token is invalid or expired");

    const filter = { email: decoded.email };
    const update = { password: password };
    const options = { new: true };

    //find the user by the filter and update password
    const resetPassword = await Users.findOneAndUpdate(
      filter,
      update,
      options
    ).select("-password");

    //if no user was found or the update failed, throw a 400 bad request error
    if (!resetPassword) throw HttpError(400, "password reset failed");

    return resetPassword;
  } catch (error) {
    throw error;
  }
};

export const UpdateUserService = async ({
  name,
  phone,
  address,
  image,
  id,
}) => {
  try {
    const options = { password: 0 };

    //find the user and get the current image
    const user = await FindOneService(Users, id, options);
    const userCurrentImage = user.image;

    //check if each field has a new value and update the updates object accordingly
    const updates = {};
    if (name) updates.name = name;
    if (phone) updates.phone = phone;
    if (address) updates.address = address;
    if (image) updates.image = image;

    //if the current image is default image, then just upload the new one
    if (userCurrentImage === defaultImageForUser) {
      //upload new image on cloudinary
      const response = await cloudinary.uploader.upload(image, {
        folder: "unishop/images/users",
      });
      updates.image = response.secure_url;
    }

    /*if the current image is not default image, then delete current image and 
    upload the new one*/
    if (userCurrentImage !== defaultImageForUser) {
      //delete current iamge which on cloudinary
      const publicId = await publicIdWithouthExtensionFromUrl(userCurrentImage);
      deleteFileFromCloudinary("unishop/images/users", publicId);

      //upload new image on cloudinary
      const response = await cloudinary.uploader.upload(image, {
        folder: "unishop/images/users",
      });
      updates.image = response.secure_url;
    }

    //update user by one field or all filed exclude password
    const updateUser = await Users.findByIdAndUpdate(id, updates, {
      new: true,
    });

    return updateUser;
  } catch (error) {
    throw error;
  }
};
