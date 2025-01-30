
"use strict";

import Order from "../models/orderModel.js";
import { ErrorResponse, SuccessResponse } from "../helpers/responseCode.js"

const CreateOrderController = async (req, res, next) => {
  try {
    const {
      cart,
      name,
      email,
      number,
      alternative_number,
      city,
      area,
      details_address,
      delivery_charge,
      discount
    } = req.body;

    if ((!name && !email && !number && !city && !area && !details_address)) {
      return ErrorResponse(res,{
        statusCode : 400,
        message : "please fill up all the fields"
      });
    }

    //place an order
    const order = await new Order({
      cart,
      name,
      email,
      number,
      alternative_number,
      city,
      area,
      details_address,
      delivery_charge,
      discount
    }).save();

    return SuccessResponse(res,{
      message: "order place successful",
      payload : {
        order
      }
    });
  } catch (error) {
     next(error);
  }
};


const GetAllOrder = async (req, res, next) => {
    try {
        const orders = await Order.find({});

        return SuccessResponse(res,{
            message : "return all order",
            payload : {
                orders
            }
        })
    } catch (error) {
        next(error)
    }
}


export {
  CreateOrderController,
  GetAllOrder,
}
