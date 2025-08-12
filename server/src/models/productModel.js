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

    suplr: {
      type: String,
    },

    retailPrice: {
      type: Number,
      required: [true, "retail price must be provided"],
    },

    salePrice: {
      type: Number,
      required: [true, "sale price must be provided"],
    },

    discount : {
      type: Number,
      default : 0,
    },

    discountPrice : {
      type : Number,
    },

    status: {
      type: Boolean,
      default: true,
    },
    
    size : {
      type : [String]
    },

    color : {
      type : [String]
    },

    pId : {
      type : String,
      required: [true, "product id must be provided"],
    },

    pType: {
      type: String,
    },

    ytLink : {
      type : String
    },
    
    featured: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String
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


productSchema.pre("save", function (next) {
  if (this.salePrice && this.discount) {
    this.discountPrice = Math.floor(
      this.salePrice - (this.salePrice * this.discount / 100)
    );
  } else {
    this.discountPrice = this.salePrice;
  }
  next();
});



const Product = model("Product", productSchema);

export default Product;
