"use strict";

//import packages
import HttpError from "http-errors";

//import helper function
import { FindOneService } from "./findOne.js";

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