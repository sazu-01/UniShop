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
    const {
      title, category, suplr, retailPrice, salePrice, discount,
      size, pId, pType, ytLink, featured, description, specification
    } = req.body;

    // Parse color images data
    let colorImagesData = [];
    try {
      colorImagesData = JSON.parse(req.body.colorImages || "[]");
    } catch (err) {
      return next(HttpError(400, "Invalid colorImages JSON"));
    }

    // Match uploaded files by original filename
    const uploadedFiles = {};
    req.files?.forEach(file => {
      uploadedFiles[file.originalname] = file.path;
    });

    const imagesWithColors = colorImagesData.map(ci => ({
      color: ci.color || "",
      url: ci.files.map(fname => uploadedFiles[fname])
    }));

    // Normalize specifications
    let normalizedSpecification = [];
    if (typeof specification === "string") {
      normalizedSpecification = JSON.parse(specification);
    } else if (Array.isArray(specification)) {
      normalizedSpecification = specification;
    }

    // Calculate discount price
    const discountPrice = discount && salePrice
      ? Math.floor(salePrice - (salePrice * discount / 100))
      : salePrice;

    const productData = {
      title,
      slug: slugify(title),
      images: imagesWithColors,
      category,
      suplr,
      retailPrice,
      salePrice,
      discount,
      discountPrice,
      pId,
      size: Array.isArray(size) ? size : [size],
      ytLink,
      pType,
      featured,
      description,
      specification: normalizedSpecification
    };

    const product = await CreateProductService(productData);

    return SuccessResponse(res, {
      statusCode: 200,
      message: "Product created successfully",
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
    const {
      title, category, suplr, retailPrice, salePrice, discount,
      pId, pType, size, ytLink, featured, description, specification
    } = req.body;
    const { slug } = req.params;

    // Parse color images data (same as create product)
    let colorImagesData = [];
    try {
      colorImagesData = JSON.parse(req.body.colorImages || "[]");
    } catch (err) {
      return next(HttpError(400, "Invalid colorImages JSON"));
    }

    // Match uploaded files by original filename
    const uploadedFiles = {};
    req.files?.forEach(file => {
      uploadedFiles[file.originalname] = file.path;
    });

    // Handle both color-grouped and simple images
    let imagesWithColors = null;
    if (colorImagesData.length > 0) {
      imagesWithColors = colorImagesData.map(ci => ({
        color: ci.color || "", // Handle empty color for simple images
        url: ci.files.map(fname => uploadedFiles[fname])
      }));
    }

    // Parse other fields
    let normalizedSpecification = [];
    if (typeof specification === "string") {
      normalizedSpecification = JSON.parse(specification);
    } else if (Array.isArray(specification)) {
      normalizedSpecification = specification;
    }

    let parsedSize = size;
    if (typeof size === "string") {
      parsedSize = JSON.parse(size);
    }

    // Calculate discount price
    let discountPrice = salePrice;
    if (discount && salePrice) {
      discountPrice = Math.floor(salePrice - (salePrice * discount / 100));
    }

    // Creating an object with updated product data
    const updateObj = {
      title,
      category,
      suplr,
      retailPrice,
      salePrice,
      discount,
      discountPrice,
      slug,
      images: imagesWithColors, // This will be null if no images uploaded
      pId,
      size: parsedSize,
      ytLink,
      pType,
      featured,
      description,
      specification: normalizedSpecification
    };

    // Calling the update product service with the updated product data
    const updatedProduct = await UpdateProductService(updateObj);
    return SuccessResponse(res, {
      statusCode: 200,
      message: "Product updated successfully",
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
