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
    const { title, images } = productData;

    // Check for duplicate product
    const checkTitle = await Products.exists({ title });
    if (checkTitle) throw HttpError(409, "Duplicate product");

    // Upload images grouped by color
    const uploadedImageGroups = await Promise.all(
      images.map(async (group) => {
        const uploadedUrls = await Promise.all(
          group.url.map(async (imgPath) => {
            const response = await cloudinary.uploader.upload(imgPath, {
              folder: "unishop/images/products",
            });
            return response.secure_url;
          })
        );
        return {
          color: group.color,
          url: uploadedUrls
        };
      })
    );

    productData.images = uploadedImageGroups;

    // Create product
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
      retailPrice,
      salePrice,
      discount,
      discountPrice,
      slug,
      images,
      pId,
      pType,
      size,
      ytLink,
      featured,
      description,
      specification
    } = updateObj;

    let update = {};
    let options = { new: true };
    let filter = { slug };

    // Update the title and slug if the title is provided
    if (title) {
      update.title = title;
      update.slug = slugify(title);
    }

    // If images are provided, remove current images and upload new ones
    if (images && images.length > 0) {
      // Get the current product data
      const product = await GetProductService(slug);
      
      // Extract all current image URLs from the nested structure
      const allCurrentImageUrls = [];
      product.images.forEach(imageGroup => {
        if (imageGroup.url && Array.isArray(imageGroup.url)) {
          allCurrentImageUrls.push(...imageGroup.url);
        }
      });

      // Remove current images from cloudinary
      await Promise.allSettled(
        allCurrentImageUrls.map(async (imageUrl) => {
          try {
            const publicId = await publicIdWithouthExtensionFromUrl(imageUrl);
            await deleteFileFromCloudinary("unishop/images/products", publicId);
          } catch (error) {
            console.error(`Failed to delete image: ${imageUrl}`, error);
          }
        })
      );

      // Upload new images grouped by color (or without color for simple images)
      const uploadedImageGroups = await Promise.all(
        images.map(async (group) => {
          const uploadedUrls = await Promise.all(
            group.url.map(async (imgPath) => {
              const response = await cloudinary.uploader.upload(imgPath, {
                folder: "unishop/images/products",
              });
              return response.secure_url;
            })
          );
          return {
            color: group.color, // This will be empty string for simple images
            url: uploadedUrls
          };
        })
      );

      // Assign the new images to product
      update.images = uploadedImageGroups;
    }

    // Properties to update directly
    const propertiesToUpdate = {
      category,
      suplr,
      retailPrice,
      salePrice,
      discount,
      discountPrice,
      pId,
      size,
      ytLink,
      pType,
      featured,
      description,
      specification
    };

    // Update properties directly
    for (const prop in propertiesToUpdate) {
      if (propertiesToUpdate[prop] !== undefined) {
        update[prop] = propertiesToUpdate[prop];
      }
    }

    // Update the product and return the updated document
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


    // Extract all image URLs from the nested structure
    const allImageUrls = [];

    // Loop through each image group (color groups or simple images)
    product.images.forEach(imageGroup => {
      if (imageGroup.url && Array.isArray(imageGroup.url)) {
        allImageUrls.push(...imageGroup.url);
      }
    });
    
   //delete the product images from Cloudinary
   await Promise.allSettled(
      allImageUrls.map(async (imageUrl) => {
        try {
          const publicId = await publicIdWithouthExtensionFromUrl(imageUrl);
          await deleteFileFromCloudinary("unishop/images/products", publicId);
        } catch (error) {
          console.error(`Failed to delete image: ${imageUrl}`, error)
        }
      })
    );

    //delete product data by slug
    const deletedProduct = await Products.findOneAndDelete({ slug });

    return deletedProduct;
  } catch (error) {
    throw error;
  }
};
