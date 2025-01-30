
"use strict";

//packages
import express from "express";

//routes
import { CreateOrderController, GetAllOrder } from "../controllers/orderController.js";

//authentication
import { IsAdmin, IsLoggedIn } from "../middlewares/authMiddleware.js";


const orderRouter = express.Router();

orderRouter.post("/create-order", IsLoggedIn, CreateOrderController);
orderRouter.get("/all-order",IsLoggedIn, IsAdmin, GetAllOrder);

export default orderRouter
