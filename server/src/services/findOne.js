"use strict";

//import package module
import HttpError from "http-errors"
import mongoose from "mongoose";


export const FindOneService = async (Model,id,options) => {
     try {
         //find the item by its ID in the given Model
        const item = await Model.findById(id,options)

        //if no item is found, throw a 404 HTTP error
        if(!item){
         throw HttpError(404 , `${Model.modelName} does not exist with this id`);
        }

        //return the item
        return item;

     } catch (error) {
        //if mongoose error then throw a 404 HTTP error
        if(error instanceof mongoose.Error){
            throw HttpError(404 , "invalid id")
        }
        throw error
     }


}