"use strict";

//import package modules
import HttpError from "http-errors";
import jwt from "jsonwebtoken";

//environment variables
import { jwtAccessKey } from "../hiddenEnv.js";


const IsLoggedIn = (req , res , next) => {
    try {
        //get accessToken from cookie
        const accessJwToken = req.cookies.accessToken;

        //if accessToken does not exist , throw an error
        if(!accessJwToken){
            throw HttpError(401 , "accessToken not found");
        }

        //decode the JWT token using the provided key
        const decoded = jwt.verify(accessJwToken , jwtAccessKey);

        //check if the token is successfully decoded , if not throw and error
        if(!decoded){
            throw HttpError(401 , "Invalid Access Token , Please Login");
        }
        
        //assign the user id to the req object
        req.user = decoded.user;

        //call next 
        next();

    } catch (error) {
        next(error);
    }
}

const IsLoggedOut = (req , res , next) => {
    try {
        //check the accessToken
        const accessJwToken = req.cookies.accessToken;

        //if find access Token and this is valid throw an error
        if(accessJwToken){
            try {
                 //verify the access token using jwt.verify() method
                const decoded = jwt.verify(accessJwToken,jwtAccessKey);

                 //if the token is valid, it means the user is already logged in
                if(decoded){
                    throw HttpError(403 , "user is already login");
                }
            } catch (error) {
                throw error;
            }
         
        }

        next()

    } catch (error) {
        next(error)
    }
}

const IsAdmin = (req , res , next) => {
   try {
       //if user is not an admin throw an error
       if(!req.user.isAdmin){
         throw HttpError(401 , "invalid accees , you have to be a admin for accessing this route")
       }
       next()
   } catch (error) {
      next(error)
   }
}

export {IsLoggedIn , IsLoggedOut , IsAdmin};