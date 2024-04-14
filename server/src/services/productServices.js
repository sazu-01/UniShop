"use strict";

//model
import Products from "../models/productModel.js";
import DeleteFile from "../helpers/deleteFile.js";
import slugify from "slugify";

export const CreateProductService = async (productData) => {
  try {
    const { title } = productData;

    //check if the product is already exist
    const checkTitle = await Products.exists({ title });

    //if exist then throw a error
    if (checkTitle) throw HttpError(409, "duplicate product");

    //create a new product
    const product = await Products.create(productData);

    return product;
  } catch (error) {
    throw error;
  }
};

export const GetAllProductsService = async (page, limit, filter = {}) => {
  try {
    //get all the products from database
    const products = await Products.find(filter)
      .populate("category") // Populate the category field with category data
      .skip((page - 1) * limit) //skip the number of products based on the current page
      .limit(limit) // Limit the number of products per page
      .sort({ createdAt: -1 }); //sort the products by createdAt in descending order

    //if no products are found, throw an error
    if (!products) throw HttpError(404, "no products found");

    //get the total count of products matching the filter
    const count = await Products.find(filter).countDocuments();

    //return the products and pagination data
    return {
      products,
      pagination: {
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        previousPage: page - 1,
        nextPage: page + 1,
        totalNumberOfProducts: count,
      },
    };
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
    const {
      title,
      description,
      category,
      quantity,
      brand,
      price,
      summary,
      slug,
      image,
    } = updateObj;

    let update = {};
    let options = { new: true };
    let filter = { slug };

    //update the title and slug if the title is provided
    if (title) {
      update.title = title;
      update.slug = slugify(title);
    }
    // Properties to update directly
    const propertiesToUpdate = {
      image,
      description,
      category,
      quantity,
      brand,
      price,
      summary,
    };

    // Update properties directly
    for (const prop in propertiesToUpdate) {
      if (propertiesToUpdate[prop] !== undefined) {
        update[prop] = propertiesToUpdate[prop];
      }
    }
    //get the current product data
    const product = await GetProductService(slug);
    //delete the old image if a new image is provided
    if (image) {
      DeleteFile(product.image);
      update.image = image;
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

    //delete the product image
    DeleteFile(product.image);

    //delete product data by slug
    const deletedProduct = await Products.findOneAndDelete({ slug });

    return deletedProduct;
  } catch (error) {
    throw error;
  }
};
