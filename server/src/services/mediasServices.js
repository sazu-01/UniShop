
"use strict"
import Media from "../models/mediaModel.js";

import cloudinary from "../config/cloudinary.js";

export const CreateCarouselService = async (mediaData) => {
  try {

    let { carouselImages } = mediaData;

      //upload images on cloudinary
      const uploadedCarouselImages = await Promise.all(
        carouselImages.map(async (image) => {
          const response = await cloudinary.uploader.upload(image, {
            folder: "unishop/images/media",
          });
          return response.secure_url;
        })
      );

      //check if a media document already exist or not
      let media = await Media.findOne();

      if(media){
        media.carouselImages.push(...uploadedCarouselImages);
        await media.save();
      }else{
        media = await Media.create({carouselImages : uploadedCarouselImages})
      }

    return media;
  } catch (error) {
    throw error;
  }
};
