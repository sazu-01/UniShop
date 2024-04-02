import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { defaultImageForUser } from "../hiddenEnv.js";


const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minLength:[3 , "name is too short"],
        maxLength: [40 , "name is too long"]
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: "Invalid email address formate"
        }
    },

    phone: {
        type: String,
        required: [true, 'you have to give a phone number'],
        unique: [true, 'already have an account with this number'],
        trim: true,
        minLength:[9 , "number is too short"],
        maxLength: [16 , "number is too long"]

    },

    password: {
        type: String,
        required: true,
        minLength: [4, 'password is too short'],
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(12))
    },

    image: {
        type: String,
        default: defaultImageForUser
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    isBanned: {
      type: Boolean,
      default: false
    }

},{timestamps:true});


const User = model("Users",userSchema);

export default User