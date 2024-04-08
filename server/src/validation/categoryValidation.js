"use strict";

//packages
import { body } from "express-validator";

export const validateCategory = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("name is required")
        .isLength({min:3, max:25})
        .withMessage("the length of category between 3-25 characters long")
]


