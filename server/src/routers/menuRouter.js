


import express from "express";
import { CreateMenuController, GetAllMenuController, 
    CreateSubMenuController, DeleteMenuController, 
    DeleteSubmenuController 
}
from "../controllers/menuController.js";

import { IsLoggedIn, IsAdmin } from "../middlewares/authMiddleware.js"

const contentRouter = express.Router();

contentRouter.post("/create-menu",IsLoggedIn, IsAdmin, CreateMenuController);

contentRouter.post("/create-submenu", IsLoggedIn, IsAdmin, CreateSubMenuController );

contentRouter.get("/all-menu", GetAllMenuController);

contentRouter.delete("/delete-menu/:menuId", IsLoggedIn, IsAdmin, DeleteMenuController);

contentRouter.delete("/delete-submenu", IsLoggedIn, IsAdmin, DeleteSubmenuController);

export default contentRouter
