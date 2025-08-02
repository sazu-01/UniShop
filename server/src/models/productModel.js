"use strict";

import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      minLength: [10, "title is too short"],
      maxLength: [100, "title is too long"],
      required: [true, "title must be provided"],
    },

    slug: {
      type: String,
      lowercase: true,
      required: [true, "slug must be provided"],
    },

    images: [
      {
        type: String,
        required: [true, "image must be provided"],
      },
    ],

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "category must be provided"],
    },

    brand: {
      type: String,
      required: [true, "brand must be provided"],
    },

    inStock: {
      type: Number,
      required : [true, "inStock must be provided"]
    },

    price: {
      type: Number,
      required: [true, "price must be provided"],
    },

    status: {
      type: Boolean,
      default: true,
    },
    
    size : {
      type : [String]
    },

     specification : [{
      key : {
        type : String,
        required : [true, "specification key is required"]
      },

      value : {
        type : String,
        required : [true, "specification value is required"]
      }
     }]
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
