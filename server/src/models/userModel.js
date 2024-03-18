import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: [40, 'name is too long'],
        minLength: [3, 'name is too short'],
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
        maxLength: 10,
        required: [true, 'you have to give a phone number'],
        unique: [true, 'already have an account with this number'],
        trim: true,
    },

    password: {
        type: String,
        minLength: [4, 'password is too short'],
        required: true,
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(12))
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