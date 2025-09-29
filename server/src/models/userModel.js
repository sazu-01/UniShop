"use strict";

//packages
import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      default : "",
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email address formate",
      },
    },

    phone: {
      type: Number,
      required: [true, "you have to give a phone number"],
      unique: [true, "already have an account with this number"],
      trim: true,
      minLength: [11, "phone number is required minimum 11 characters"],
      maxLength: [13, "phone number is required maximum 13 characters"],
    },

    password: {
      type: String,
      required: true,
      minLength: [4, "password is too short"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(12)),
    },

    image: {
      type: String,
    },

    address: {
      type: String,
      default : "",
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("Users", userSchema);

export default User;
