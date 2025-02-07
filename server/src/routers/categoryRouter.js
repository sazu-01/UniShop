"use strict";
//import packages
import express from "express";

//import controller functions
import { CreateCategoryController, GetAllCategoryController, GetCategoryBySlug,UpdateCategoryBySlug,DeleteCategory} from "../controllers/categoryController.js";

//validation
import {validateCategory} from "../validation/categoryValidation.js";
import RunValidation from "../validation/index.js";

//middlewares
import { IsAdmin, IsLoggedIn } from "../middlewares/authMiddleware.js";

//make an express router
const categoryRouter = express.Router();


categoryRouter.post("/create-category",IsLoggedIn,IsAdmin,validateCategory,
RunValidation,CreateCategoryController);

categoryRouter.get("/all-category",GetAllCategoryController)
categoryRouter.get("/:slug", GetCategoryBySlug);
categoryRouter.put("/update-category/:slug",IsLoggedIn,IsAdmin,UpdateCategoryBySlug);
categoryRouter.delete("/delete-category/:slug",IsLoggedIn,IsAdmin,DeleteCategory);

export default categoryRouter;