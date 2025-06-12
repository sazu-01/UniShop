

"use strict";

//packages
import { body } from "express-validator";

export const validateOrder = [

    body("name").notEmpty().withMessage("please input your name"),

    body("email").notEmpty().withMessage("please input your email"),

    body("number").notEmpty().withMessage("please input your active number"),

    body("city").notEmpty().withMessage("please select city"),

    body("area").notEmpty().withMessage("please select area"),

    body("details_address").notEmpty().withMessage("please select your detail address"),

    body("paymentMethod").notEmpty().withMessage("Please select a payment method"),
];
