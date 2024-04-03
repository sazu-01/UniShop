"use strict";

//import package
import { Schema , model } from "mongoose";

const categorySchema = new Schema({
   name: {
     type: String,
     trim: true,
     unique: true,
     required: [true, "category name is required"],
     unique: true,
   },

   slug: {
    type: String,
    required: [true, "category slug is required"],
    lowercase: true,
    unique: true,
   }

},{timestamps:true});


const Category = model("Category",categorySchema);

export default Category
