"use strict";

//packages
import { body } from "express-validator";

export const validateUserRegistration = [
  body("name")
    .trim(),
    
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("invalid email address"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password should be at least 6 characters"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("phone is required")
    .isLength({ max: 13, min: 11 })
    .withMessage("phone number minimum 11 and maximum 13 characters"),

  body("address").optional(),
  body("image").optional(),
];


export const validateUserLogin = [
  body().custom((value)=> {
    if(!value.email && !value.phone) {
      throw new Error("provide either email or phone to login")
    }
    return true;
  }),

  body("password")
    .notEmpty()
    .withMessage("you have to give password for login"),
];
