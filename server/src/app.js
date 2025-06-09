"use strict";

//packages
import express from "express";
import morgan from "morgan";
import createHttpError from "http-errors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

//helpers function
import { ErrorResponse } from "./helpers/responseCode.js";

//import router files
import userRouter from "./routers/userRouter.js";
import authRouter from "./routers/authRouter.js";
import categoryRouter from "./routers/categoryRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js"
import contentRouter from "./routers/menuRouter.js";
import mediaRouter from "./routers/mediaRouter.js";
//create an express application;
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin : ["http://localhost:3000", "https://unishopbd.vercel.app"],
    credentials  : true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));

//routers
app.use("/api/users", userRouter);
app.use("/api/auth",authRouter); 
app.use("/api/categories",categoryRouter);
app.use("/api/products",productRouter);
app.use("/api/order",orderRouter);
app.use("/api/media", mediaRouter);
app.use("/api/menu", contentRouter);

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
