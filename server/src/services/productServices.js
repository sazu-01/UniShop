"use strict";

//packages
import slugify from "slugify";
import cloudinary from "../config/cloudinary.js";
import HttpError from "http-errors";

//model
import Products from "../models/productModel.js";

//helper function
import {
  deleteFileFromCloudinary,
  publicIdWithouthExtensionFromUrl,
} from "../helpers/cloudinaryHelper.js";

export const CreateProductService = async (productData) => {
  try {
    let { title, images } = productData;

    //check if the product is already exist
    const checkTitle = await Products.exists({ title });

    //if exist then throw a error
    if (checkTitle) throw HttpError(409, "duplicate product");

    //upload images on cloudinary
    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const response = await cloudinary.uploader.upload(image, {
          folder: "unishop/images/products",
        });
        return response.secure_url;
      })
    );
    
    //assing product images to array of images
    productData.images = uploadedImages;

    //create a new product
    const product = await Products.create(productData);

    return product;
  } catch (error) {
    throw error;
  }
};

export const GetAllProductsService = async () => {
  try {
    //get all the products from database
    const products = await Products.find()
      .populate("category") // Populate the category field with category data

    //if no products are found, throw an error
    if (!products) throw HttpError(404, "no products found");

    return { products };
  } catch (error) {
    throw error;
  }
};

export const GetProductService = async (slug) => {
  try {
    //find a product by slug and populate the category field
    const singleProduct = await Products.findOne({ slug }).populate("category");

    return singleProduct;
  } catch (error) {
    throw error;
  }
};

export const UpdateProductService = async (updateObj) => {
  try {
 
    let {
      title,
      category,
      suplr,
      price,
      slug,
      images,
      pId,
      specification
    } = updateObj;

    let update = {};
    let options = { new: true };
    let filter = { slug };
    
    //update the title and slug if the title is provided
    if (title) {
      update.title = title;
      update.slug = slugify(title);
    }


    //if the images field are provided then remove the current images and upload provided images
   if(images && images.length > 0) {

     //Get the current image url from product data 
      const product = await GetProductService(slug);    
      const arrayOfImages = product.images;

    //remove current images from cloudinary
     await Promise.allSettled(arrayOfImages.map( async (image) => {
        const publicId = await publicIdWithouthExtensionFromUrl(image);
        await deleteFileFromCloudinary("unishop/images/products", publicId)
     }));
    
    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const response = await cloudinary.uploader.upload(image, {
          folder : "unishop/images/products"
        });
        return response.secure_url;
      })
    );

    //assign the new images to product image
    update.images = uploadedImages;
    
   }

    // Properties to update directly
    const propertiesToUpdate = {
      category,
      suplr,
      price,
      pId,
      specification
    };

    // Update properties directly
    for (const prop in propertiesToUpdate) {
      if (propertiesToUpdate[prop] !== undefined) {
        update[prop] = propertiesToUpdate[prop];
      }
    }

    //update the product and return the updated document
    const updatedProduct = await Products.findOneAndUpdate(
      filter,
      update,
      options
    );

    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

export const DeleteProductService = async (slug) => {
  try {
    //get the current product data
    const product = await GetProductService(slug);

    //get current product image
    const arrayOfImages = product.images;
    
   //delete the product images from Cloudinary
   await Promise.allSettled(
      arrayOfImages.map(async (image) => {
        const publicId = await publicIdWithouthExtensionFromUrl(image);
        await deleteFileFromCloudinary("unishop/images/products", publicId);
      })
    );

    //delete product data by slug
    const deletedProduct = await Products.findOneAndDelete({ slug });

    return deletedProduct;
  } catch (error) {
    throw error;
  }
};
