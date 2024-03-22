"use strict";

//import package modules
import express from "express";
import morgan from "morgan";
import createHttpError from "http-errors";
import bodyParser from "body-parser";


//import router files
import userRouter from "./routers/userRouter.js";
import { ErrorResponse } from "./helper/responseCode.js";

//create an express application;
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set user router
app.use("/api/users", userRouter);
app.use("/api/users", userRouter);



//home route
app.get("/", function (req, res) {
    res.status(200).send("welcome to the server");
});


//client side error
app.use(function (req, res, next) {
    next(createHttpError(404, "route not found"))
})

//server side error -> all error store on this
app.use(function (err, req, res, next) {
    return ErrorResponse(res,{
        statusCode: err.status,
        message: err.message
    })
});


export default app;
