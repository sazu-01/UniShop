"use strict";

//packages
import slugify from "slugify";

//helpers
import { SuccessResponse } from "../helpers/responseCode.js";

//services
import {
  CreateProductService,
  DeleteProductService,
  GetAllProductsService,
  GetProductService,
  UpdateProductService,
} from "../services/productServices.js";

const CreateProductController = async (req, res, next) => {
  try {
    const { title, category, suplr, retailPrice, salePrice, discount, size, color, pId, pType, ytLink, 
      featured, description, specification } = req.body;

    //checking if images are uploaded with the request
    const images = req.files?.map((file) => file.path);

    // Handle size & color as an array (multer parses it as either array or single value)

    if (size && !Array.isArray(size)) {
      // If only one size is provided, convert it to an array
      size = [size];
    }

    if (color && !Array.isArray(color)) {
      // If only one color is provided, convert it to an array
      color = [color];
    }

    let normalizedSpecification = [];

    if (typeof specification === "string") {
      normalizedSpecification = JSON.parse(specification)
    } else if (Array.isArray(specification)) {
      normalizedSpecification = specification;
    }

    //Calculate discountPrice
    let discountPrice = salePrice;
    if (discount && salePrice) {
      discountPrice = Math.floor(salePrice - (salePrice * discount / 100));
    }

    //creating an object with product data
    const productData = {
      title,
      slug: slugify(title),
      images,
      category,
      suplr,
      retailPrice,
      salePrice,
      discount,
      discountPrice,
      pId, //product id 
      size,
      color,
      ytLink, // youtube video demo link
      pType, //product type
      featured,
      description,
      specification: normalizedSpecification
    };

    //call the createproduct service with product data
    const product = await CreateProductService(productData);

    return SuccessResponse(res, {
      statusCode: 200,
      message: "product created successfully",
      payload: { product },
    });
  } catch (error) {
    next(error);
  }
};

const GetAllProducts = async (req, res, next) => {
  try {

    //calling the get all products service with pagination and filter
    const { products } = await GetAllProductsService();

    //return all the products
    return SuccessResponse(res, {
      statusCode: 200,
      message: "return all the products",
      payload: {
        products,
      },
    });
  } catch (error) {
    next(error);
  }
};

const GetSingleProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    //call the get product service with the slug
    const singleProduct = await GetProductService(slug);

    return SuccessResponse(res, {
      statusCode: 200,
      message: "return product by slug",
      payload: { singleProduct },
    });
  } catch (error) {
    next(error);
  }
};

const updateProductBySlug = async (req, res, next) => {

  try {

    let { title, category, suplr, retailPrice, salePrice, discount, pId, pType, size, color, ytLink, 
    featured, description, specification } = req.body;

    const { slug } = req.params;

    //checking if an image is uploaded with the request
    const images = req.files?.map((file) => file.path) || [];


    if (specification && typeof specification === "string") {
      specification = JSON.parse(specification)
    }

    if (size && typeof size === "string") {
      size = JSON.parse(size);
    }
    if (color && typeof color === "string") {
      color = JSON.parse(color);
    }

    //Calculate discountPrice
    let discountPrice = salePrice;
    if (discount && salePrice) {
      discountPrice = Math.floor(salePrice - (salePrice * discount / 100));
    }

    //creating an object with updated product data
    const updateObj = {
      title,
      category,
      suplr, //supplier
      retailPrice,
      salePrice,
      discount,
      discountPrice,
      slug,
      images,
      pId,
      size,
      color,
      ytLink,
      pType,
      featured,
      description,
      specification
    };


    //calling the update product service with the updated product data
    const updatedProduct = await UpdateProductService(updateObj);

    return SuccessResponse(res, {
      statusCode: 200,
      message: "update product successfully",
      payload: {
        updatedProduct,
      },
    });
  } catch (error) {
    next(error);
  }
};

const DeleteProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    //calling the update product service with the slug
    const deletedProduct = await DeleteProductService(slug);

    return SuccessResponse(res, {
      statusCode: 200,
      message: "delete product successfully",
      payload: { deletedProduct },
    });
  } catch (error) { }
};

export {
  CreateProductController,
  GetAllProducts,
  GetSingleProductBySlug,
  DeleteProductBySlug,
  updateProductBySlug,
};
