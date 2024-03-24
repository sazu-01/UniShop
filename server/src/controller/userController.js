"use strict";

//import package modules
import HttpError from "http-errors";
import Jwt from "jsonwebtoken";

//import user model
import User from "../models/userModel.js";

//import helper functions
import { SendEmail } from "../helper/nodeMailer.js";
import { CreateJsonWebToken } from "../helper/jwt.js";
import { SuccessResponse } from "../helper/responseCode.js";
import { deleteImage } from "../helper/deleteImg.js";

//import environment variables
import { clientUrl, jwtPrivateKey } from "../hiddenEnv.js";

//import services function
import { FindByID } from "../services/findById.js";



async function GetAllUsers(req, res, next) {

    try {

        //destructure the search page and limit from the parameters
        const { limit = 10, page = 1, search = "" } = req.query;

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
                { password: { $regex: new RegExp(searchPattern, "i") } }
            ]
        };

        //set password to false
        const options = { password: 0 };

        //get all the users from database
        const users = await User.find(filter, options).limit(limitNum).skip((pageNum - 1) * limitNum);

        //countDocuments for all the filter user
        const count = await User.find(filter).countDocuments();

        //if no user found , throw an error 
        if (!users) throw HttpError(404, "no user found");

        //calculate the totalNumbers of page
        const totalPages = Math.ceil(count / limitNum)

        //successfully back all the users from database
        return SuccessResponse(res, {
            message: "return all the users",
            payload: {
                users,
                pagination: {
                    totalPages,
                    currentPage: pageNum,
                    previousPage: pageNum - 1 ? pageNum - 1 : null,
                    nextPage: pageNum < totalPages ? pageNum + 1 : null
                }
            }
        })

    } catch (error) {
        next(error)
    }

}


const GetSingleUserByID = async (req, res, next) => {
    try {
        //get id from request params
        const id = req.params.id;

        //set options to exclude password field
        const options = { password: 0 }

        const singleUser = await FindByID(User, id, options)

        //if user not found, throw an error
        if (!singleUser) {
            throw HttpError(404, "User with this id does not exist");
        }

        //send the response with the user
        return SuccessResponse(res, {
            message: "return a single user by id",
            payload: { singleUser }
        })

    } catch (error) {
        next(error)
    }
}


const RegisterProcess = async (req, res, next) => {

    try {
        //destructure name email phone and password from req.body
        const { name, email, phone, password } = req.body;

        //check if any of the field are missing
        if (!name || !email || !phone || !password) {
            throw HttpError(404, "please fill up all the fields")
        }

        //check if a user with the provided email already exists
        const existingUserViaEmail = await User.exists({ email: email });
        if (existingUserViaEmail) {
            throw HttpError(409, "User with this email already exist. please login")
        }

        //check if a user with the provided phone number already exist
        const existingUserViaPhone = await User.exists({ phone: phone });
        if (existingUserViaPhone) {
            throw HttpError(409, "user already exist with this number");
        }

        //create a newuser instance
        const newUser = new User({ name, email, phone, password });

        //check if the user validate or not validate the user
        await newUser.validate();

        //create a json web token for the new user
        const token = CreateJsonWebToken({ name, email, phone, password }, 
        jwtPrivateKey, "10m");

        //prepare an email
        const emailData = {
            name,
            email,
            subject: "Activation Email From UniShop",
            html: `
            <h2>Hello ${name}</h2>
            <p>please click on the following link to activate your email</p>
            <a href="${clientUrl}/api/users/activate/${token}" target="blank">
            activate account</a>`
        }

        //send verification email
        try {
            /* await SendEmail(emailData)*/
        } catch (error) {
            console.log(error.message);

        }

        // send a response with a message and the generated token
        return SuccessResponse(res, {
            message: `please go to your email and click on the 
                      given link to activate your email`,
            payload: {
                token
            }
        })
    } catch (error) {
        next(error)
    }
}


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
        await User.create(decode);

        //send a success response
        return SuccessResponse(res, {
            message: "user registered successfully",
        })

    } catch (error) {
        //handle specific token related error
        if (error.name === "TokenExpiredError") {
            throw HttpError(401, "Token has expired");
        } else if (error.name === "JsonWebTokenError") {
            throw HttpError(401, "Invalid Token");
        } else {
            //pass other error to next middlewares
            next(error)
        }
    }
}

const UpdateUserByID = async (req, res, next) => {
    try {

        //destructure name email and password from request body
        const { name, email, phone } = req.body;

        //get the id from request params
        const id = req.params.id;

        //update user by one field or all filed exclude password
        const updateUser = await User.findByIdAndUpdate(id, { name, email, phone },
            { new: true });

        //send a successful res
        return SuccessResponse(res, {
            message: "update user succesfully",
            payload: { updateUser }
        })

    } catch (error) {
        next(error)
    }
}

const BannedUserByID = async (req, res, next) => {
    try {
        const userId = req.params.id;
        await FindByID(User, userId);
        const updates = {isBanned: true};
        const updateOptions = {new:true, runValidators:true, context:"query"};
        
        const updateUser = await User.findByIdAndUpdate(
            userId,
            updates,
            updateOptions,
        ).select("-password");

        if(!updateUser){
            throw HttpError(400, "use is not banned");
        }

        return SuccessResponse(res,{
            statusCode: 200,
            message: "user is banned"
        })
        
    } catch (error) {
        next(error)
    }
}

const UnBannedUserByID = async (req, res , next) => {
    try {
        const userId = req.params.id;
        await FindByID(User, userId);
        const updates = {isBanned: false};
        const updateOptions = {new:true, runValidators:true, context:"query"};
        
        const updateUser = await User.findByIdAndUpdate(
            userId,
            updates,
            updateOptions,
        ).select("-password");

        if(!updateUser){
            throw HttpError(400, "use is not unbanned");
        }

        return SuccessResponse(res,{
            statusCode: 200,
            message: "user is unbanned"
        })
        
    } catch (error) {
        next(error)
    }
}


const DeleteUserByID = async (req, res, next) => {
    try {
        //get the default image for user
        const defaultImageForUser = User.image;

        //send the default image of user
        deleteImage(defaultImageForUser);

        //get the id from request params
        const id = req.params.id;

        //find the user by id
        const user = await FindByID(User, id);

        //if user doesn't exist or is an admin, return an error
        if (!user || user.isAdmin) {
            return res.status(400).send({
                message: "user not found or is an admin"
            });
        }

        // delete the non-admin user
        const deletedUser = await user.deleteOne();

        //send successful response with the deleted user
        return SuccessResponse(res, {
            message: "delete user successfully",
            payload: {
                deletedUser
            }
        })

    } catch (error) {
        next(error)
    }
}



export {
    GetAllUsers,
    GetSingleUserByID,
    RegisterProcess,
    CompleteUserRegister,
    UpdateUserByID,
    BannedUserByID,
    UnBannedUserByID,
    DeleteUserByID
}