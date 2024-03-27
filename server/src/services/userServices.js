"use strict";

//import package module
import HttpError from "http-errors"
import mongoose from "mongoose";

//import helper functions
import { deleteImage } from "../helper/deleteImg.js";


export const FindUsersService = async ({limit,page,search},Users) => {
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
                  { password: { $regex: new RegExp(searchPattern, "i") } }
              ]
          };
  
          //set password to false
          const options = { password: 0 };
  
          //get all the users from database
          const users = await Users.find(filter, options)
          .limit(limitNum).skip((pageNum - 1) * limitNum);
  
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
            }
          }
  
    } catch (error) {
        throw error
    }
}

export const FindOneService = async (Users,id,options) => {
    try {
        //find the user by its ID in the given Model
       const user = await Users.findById(id,options)

       //if no user is found, throw a 404 HTTP error
       if(!user){
        throw HttpError(404 , "user does not exist with this id");
       }

       //return the item
       return user;

    } catch (error) {
       //if mongoose error then throw a 404 HTTP error
       if(error instanceof mongoose.Error){
           throw HttpError(404 , "invalid id")
       }
       throw error
    }


}

export const deleteOneService = async (id, Users) => {
    try {
 
       //get the default image for user
       const defaultImageForUser = Users.image;
 
       //send the default image of user
       deleteImage(defaultImageForUser);
 
       //find the user by id
       const user = await FindOneService(Users, id);
 
       //if user doesn't exist or is an admin, return an error
       if (!user || user.isAdmin) {
          throw HttpError(400, "user can not be deleted");
       }
 
       // delete the non-admin user
       const deletedUser = await user.deleteOne();
 
       //return the deleted user
       return user;
 
 
    } catch (error) {
       throw error;
    }
}

export const banOrUnbanService = async (Users , userId , updates) => {
    try {
 
     //find a user with id
     await FindOneService(Users, userId);
 
     // Options for the update operation
     const updateOptions = {new:true, 
       runValidators:true, 
       context:"query"};
     
     //find and update the user document withouth password field
     const updateUser = await Users.findByIdAndUpdate(
         userId,
         updates,
         updateOptions,
     ).select("-password");
 
     //if the update operation didn't find a user, throw an error
     if(!updateUser){
         throw HttpError(400, "use is not banned");
     }
    } catch (error) {
      throw error
    }
}


