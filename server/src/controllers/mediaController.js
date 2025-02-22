

"use strict";

import HttpError from "http-errors";
import { SuccessResponse } from "../helpers/responseCode.js";
import { CreateCarouselService } from "../services/mediasServices.js";
import Media from "../models/mediaModel.js";
import cloudinary from "../config/cloudinary.js";

export const CreateCarouselController = async (req, res, next) => {
    try {
      
      //checking if images are uploaded with the request
      const carouselImages = req.files?.map((file)=> file.path);

      const mediaData = {
        carouselImages        
      };
  
      //call the createproduct service with product data
      const media = await CreateCarouselService(mediaData);
  
      return SuccessResponse(res, {
        statusCode: 200,
        message: "media add successfully",
        payload: { media },
      });
    } catch (error) {
      next(error);
    }
  };




  export const GetAllMedia = async (req, res, next) => {
    try {
        const allMedia = await Media.find({});
        
        if(!allMedia) throw HttpError(404, "No media found");

        return SuccessResponse(res, {
            message : "return all media",
            payload : {
                allMedia
            }
        })
    } catch (error) {
        next(error)
    }
  }



export const DeleteCarouselController = async (req, res, next) => {
    try {
      const { imageUrl } = req.body; // Get the image URL from request body
      
      if (!imageUrl) {
        return res.status(400).json({
          success: false,
          message: "Image URL is required",
        });
      }
  
      // Find the media document
      let media = await Media.findOne();
      if (!media) {
        return res.status(404).json({
          success: false,
          message: "Media not found",
        });
      }
  
      // Check if the image exists in the array
      if (!media.carouselImages.includes(imageUrl)) {
        return res.status(404).json({
          success: false,
          message: "Image not found in carousel",
        });
      }
  
      // Remove the image from the carouselImages array
      media.carouselImages = media.carouselImages.filter((img) => img !== imageUrl);
  
      // Save the updated media document
      await media.save();
  
      // Optional: Delete from Cloudinary
      const publicId = imageUrl.split("/").pop().split(".")[0]; // Extract public ID
      await cloudinary.uploader.destroy(`unishop/images/media/${publicId}`);
  
      return res.status(200).json({
        success: true,
        message: "Image deleted successfully",
        payload: media,
      });
    } catch (error) {
      next(error);
    }
  };
  
