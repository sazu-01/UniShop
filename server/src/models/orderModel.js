
"use strict"

//packages
import { Schema, model } from "mongoose"

const orderSchema = new Schema({
  cart: Object,

    name : {
      type : String,
      required : true
    },

    email : {
     type : String,
     required : true
    },

    number : {
        type : String,
        required : true
    },
    
    alterNative_number : {
      type : String,
      required : false
    },

    city : {
        type : String,
        required : true
    },

    area : {
        type : String,
        required : true
    },

    details_address : {
        type : String,
        required : true
    },

    delivery_charge : {
      type : String,
      required : true
    },

    discount : {
        type : String,
    }
},{timestamps: true});

const Order = model("Order", orderSchema);

export default Order

