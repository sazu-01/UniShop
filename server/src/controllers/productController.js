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
    const { title, category, brand, price, size, pId, specification } =
      req.body;

    //checking if images are uploaded with the request
    const images = req.files?.map((file) => file.path);

    // Handle size as an array (multer parses it as either array or single value)
    if (size && !Array.isArray(size)) {
      // If only one size is provided, convert it to an array
      size = [size];
    }

    let normalizedSpecification = [];

    if (typeof specification === "string") {
      normalizedSpecification = JSON.parse(specification)
    } else if (Array.isArray(specification)) {
      normalizedSpecification = specification;
    }

    //creating an object with product data
    const productData = {
      title,
      slug: slugify(title),
      images,
      category,
      brand,
      price,
      size,
      pId,
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

    let { title, category, brand, price, pId, specification } =
      req.body;

    const { slug } = req.params;

    //checking if an image is uploaded with the request
    const images = req.files?.map((file) => file.path) || [];


    if (specification) {
      if (typeof specification === "string") {
        specification = JSON.parse(specification)
      }
    }


    //creating an object with updated product data
    const updateObj = {
      title,
      category,
      brand,
      price,
      slug,
      images,
      pId,
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
