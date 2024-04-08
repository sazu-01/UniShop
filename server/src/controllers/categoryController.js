"use strict"

//packages
import slugify from "slugify";

//model
import Category from "../models/categoryModel.js"

//import helpers functions
import { SuccessResponse } from "../helpers/responseCode.js"
import HttpError from "http-errors";


const CreateCategoryController = async (req, res, next) => {
    try {
        const { name } = req.body;
        
        //create a new category using the Category model and provided data
        const newCategory = await Category.create({
            name: name,
            slug: slugify(name)
        })

        //return success response with the newly created category
        return SuccessResponse(res, {
            statusCode: 200,
            message: "category created successfully",
            payload: { newCategory }
        })
    } catch (error) {
        next(error);
    }
}


const GetAllCategoryController = async (req, res, next) => {
    try {
        //retrieve all categories from the database 
        const categories = await Category.find({}).select("name slug").lean();

        //return success response with all categories
        return SuccessResponse(res, {
            statusCode: 200,
            message: "return all the categories",
            payload: { categories }
        })
    } catch (error) {
        next(error);
    }
}

const GetCategoryBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;

        //find a category in the database by its slug
        const findBySlug = await Category.findOne({ slug }).select("name slug").lean();

        //if category not found, throw a 404 error
        if (!findBySlug) throw HttpError(404, "category not found");

        //return success response with the found category
        return SuccessResponse(res, {
            statusCode: 200,
            message: "return by slug category",
            payload: findBySlug
        })
    } catch (error) {
        next(error);
    }
}

const UpdateCategoryBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const { name } = req.body;

        //define filters
        const filter = { slug };
        const updates = { $set: { name: name, slug: slugify(name) } };
        const options = { new: true };

        //find and update the category in the database
        const updateCategory = await Category.findOneAndUpdate(filter, updates, options);

        //if category not found, throw a 404 error
        if (!updateCategory) throw HttpError(404, "category not found")

        //return success response with the updated category
        return SuccessResponse(res, {
            statusCode: 200,
            message: "updat category successfully",
            payload: updateCategory
        })

    } catch (error) {
        next(error);
    }
}


const DeleteCategory = async (req, res, next) => {
    try {
        const { slug } = req.params;

        //find and delete the category in the database by its slug
        const deleteCategory = await Category.findOneAndDelete({ slug });

        //return success response with the deleted category
        return SuccessResponse(res, {
            statusCode: 200,
            message: "category delete successfull",
            payload: deleteCategory
        })
    } catch (error) {
        next(error);
    }
}


export {
    CreateCategoryController,
    GetAllCategoryController,
    GetCategoryBySlug,
    UpdateCategoryBySlug,
    DeleteCategory
};