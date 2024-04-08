"use strict";

//packages
import { body } from "express-validator";

export const validateUserRegistration = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3, max: 31 })
    .withMessage("name should be at least 3-31 characters"),

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
    .isLength({ max: 15, min: 10 })
    .withMessage("phone number minimum 10 and maximum 15 characters"),

  body("address").optional(),
  body("image").optional(),
];


export const validateUserLogin = [
  body("email").notEmpty().withMessage("you have to give an email for login"),

  body("password")
    .notEmpty()
    .withMessage("you have to give a password for login"),
];
