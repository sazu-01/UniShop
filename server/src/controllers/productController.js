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
    const { title, description, category, quantity, brand, price, summary } =
      req.body;

    //checking if images are uploaded with the request
    const images = req.files?.map((file)=> file.path);

    //creating an object with product data
    const productData = {
      title,
      slug: slugify(title),
      images,
      description,
      category,
      quantity,
      brand,
      price,
      summary,
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
    const { title, description, category, quantity, brand, price, summary } =
      req.body;

    const { slug } = req.params;

    //checking if an image is uploaded with the request
    const image = req.file?.path;

    //creating an object with updated product data
    const updateObj = {
      title,
      description,
      category,
      quantity,
      brand,
      price,
      summary,
      slug,
      image,
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
  } catch (error) {}
};

export {
  CreateProductController,
  GetAllProducts,
  GetSingleProductBySlug,
  DeleteProductBySlug,
  updateProductBySlug,
};
