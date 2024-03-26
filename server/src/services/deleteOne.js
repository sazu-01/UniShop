"use strict";

//import packages
import HttpError from "http-errors";

//import helper functions
import { deleteImage } from "../helper/deleteImg.js";
import { FindOneService } from "./findOne.js";

export const deleteOneService = async (id, Model) => {
   try {

      //get the default image for user
      const defaultImageForUser = Model.image;

      //send the default image of user
      deleteImage(defaultImageForUser);

      //find the user by id
      const item = await FindOneService(Model, id);

      //if user doesn't exist or is an admin, return an error
      if (item.modelName === "Users" || !item || item.isAdmin) {
         throw HttpError(400, `${Model.modelName} can not be deleted`);
      }

      // delete the non-admin user
      const deletedItem = await item.deleteOne();

      //return the deleted user
      return item;


   } catch (error) {
      throw error;
   }
}