

import Menu from "../models/menuModel.js";
import { SuccessResponse } from "../helpers/responseCode.js"

export const CreateMenuController = async (req, res, next) => {
    try {
        const { menu, submenu } = req.body;

        if (!menu) {
            return res.status(400).json({ success: false, message: "Menu name is required" });
        }

        const newMenu = new Menu({ menu, submenu: submenu || [] });
        await newMenu.save();

        return SuccessResponse(res, {
            message: "Menu created successfully",
            payload : {
                newMenu
            }

        })

    } catch (error) {
        next(error);
    }
};


export const CreateSubMenuController = async (req, res, next) => {
    try {
        const { menuId, submenu } = req.body;
    
        if (!menuId || !submenu) {
          return res.status(400).json({ message: "Menu ID and submenu are required" });
        }
    
        const menu = await Menu.findById(menuId);
        if (!menu) {
          return res.status(404).json({ message: "Menu not found" });
        }
    
        menu.submenu.push(submenu);
        await menu.save();
    
        
        return SuccessResponse(res,{
           message : "Submenu added successfully",
           payload : {
            menu
           } 
        })
      } catch (error) {
        next(error);
      }
    
}



export const GetAllMenuController = async (req, res, next) => {
    try {
        const allMenu = await Menu.find({});

        return SuccessResponse(res, {

            message : "return all menu",
            payload : { allMenu }
        })
    } catch (error) {
        next(error)
    }
}



export const DeleteMenuController = async (req, res, next) => {
    try {
      const { menuId } = req.params; // or you can use req.body.menuId if preferred
  
      if (!menuId) {
        return res.status(400).json({ success: false, message: "Menu ID is required" });
      }
  
      const deletedMenu = await Menu.findByIdAndDelete(menuId);
  
      if (!deletedMenu) {
        return res.status(404).json({ success: false, message: "Menu not found" });
      }
  

       return  SuccessResponse(res, {
        success : true,
        message: "Menu deleted successfully",
        payload : {
            deletedMenu
        }
      })
    } catch (error) {
      next(error);
    }
  };  



export const DeleteSubmenuController = async (req, res, next) => {
    try {
      const { menuId, submenu } = req.body;
  
      if (!menuId || !submenu) {
        return res.status(400).json({ success: false, message: "Menu ID and submenu are required" });
      }
  
      const menu = await Menu.findById(menuId);
      if (!menu) {
        return res.status(404).json({ success: false, message: "Menu not found" });
      }
  
      // Check if the submenu exists in the menu
      if (!menu.submenu.includes(submenu)) {
        return res.status(404).json({ success: false, message: "Submenu not found in this menu" });
      }
  
      // Remove the submenu from the submenu array
      menu.submenu = menu.submenu.filter((sub) => sub !== submenu);
      await menu.save();
  
      return SuccessResponse(res, {
        success : true,
        message: "Submenu deleted successfully",
        payload : {
            menu
        }
      }) 
    } catch (error) {
      next(error);
    }
  };
  