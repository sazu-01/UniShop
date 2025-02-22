

"use strict";

import { Schema, model } from "mongoose";

const menuSchema = Schema({
    menu : {type : String},
    submenu: { type: [String], default: [] }
},
{ timestamps: true });

const Menu = model("Menu", menuSchema);

export default Menu;