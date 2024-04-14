"use strict";

//packages
import { body } from "express-validator";
import HttpError from "http-errors";

export const validateProduct = [
      
  body("title")
    .notEmpty()
    .withMessage("title is reqired")
    .isLength({ min: 10, max: 100 })
    .withMessage("min length of product title is 10 and max 100"),

    body('image').custom((value, { req }) => {
      const image = req.file;
      if (!image) {
        throw HttpError(404, 'image is required');
      }
      return true; 
    }), 

  body("description")
    .isLength({ min: 10 })
    .withMessage("description must be 10 characters"),

  body("category").notEmpty().withMessage("category is required"),

  body("brand").notEmpty().withMessage("brand is reqired"),

  body("quantity").notEmpty().withMessage("quantity is required"),

  body("price").notEmpty().withMessage("price is required"),
];
