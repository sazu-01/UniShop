"use strict";

//packages
import express from "express";

import {
     CreateProductController,
     GetAllProducts,
     GetSingleProductBySlug,
     DeleteProductBySlug,
     updateProductBySlug
 } from "../controllers/productController.js";

//validation
import { validateProduct } from "../validation/productValidation.js";
import RunValidation from "../validation/index.js";

//authentication
import { IsLoggedIn, IsAdmin } from "../middlewares/authMiddleware.js";

import { uploadProductImg } from "../middlewares/uploadFile.js";

//make an express router
const productRouter = express.Router();

productRouter.post("/create-product",IsLoggedIn,IsAdmin,
uploadProductImg.array("images"),validateProduct,RunValidation,CreateProductController);

productRouter.get("/all-product", GetAllProducts);

productRouter.get("/:slug", GetSingleProductBySlug);

productRouter.put("/update-product/:slug",uploadProductImg.single("image"),
IsLoggedIn,IsAdmin,updateProductBySlug);

productRouter.delete(
  "/delete-product/:slug",
  IsLoggedIn,
  IsAdmin,
  DeleteProductBySlug
);

export default productRouter;
