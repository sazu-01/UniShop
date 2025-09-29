"use strict";

//packages
import { body } from "express-validator";

export const validateUser = [
  body("name")
    .trim(),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("phone is required")
    .isLength({ max: 13, min: 11 })
    .withMessage("phone input a valid bd phone number"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password should be at least 6 characters"),
  
  body("email").optional(),
  body("address").optional(),
  body("image").optional(),
];
