

"use client";

import React, { useState, useEffect } from "react";
import "@/css/AdminContentLayout.css";
import { MdDelete } from "react-icons/md";

interface Category {
  name: string;
  slug: string;
}

interface MenuType {
  _id: string;
  menu: string;
  submenu: string[];
}

export default function AdminContentLayout() {

  const [AllCategories, setAllCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [menus, setMenus] = useState<MenuType[]>([]);
  
  // Track selected submenu for each menu (by menuId)
  

  // Fetch all categories
  const handleAllCategories = async () => {
    try {
      const  res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/all-category`);
      const data = await res.json();
      setAllCategories(data.payload.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleAllCategories();
  }, []);

  // Fetch all menus
  const handleGetAllMenu = async () => {
    try {
      const res  = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/menu/all-menu`);
      const data = await res.json();
      setMenus(data.payload.allMenu);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllMenu();
  }, []);

  // Compute used category names (as menu or submenu)
  const usedCategoryNames = new Set<string>();
  menus.forEach((menu) => {
    usedCategoryNames.add(menu.menu);
    menu.submenu.forEach((sub) => usedCategoryNames.add(sub));
  });

  // Filter categories that have not been used
  const availableCategories = AllCategories.filter(
    (cat) => !usedCategoryNames.has(cat.name)
  );

  // Create a new menu (only if category not used anywhere)
  const handleCreateMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return alert("Please select a category");
    // Double-check if the category is still available
    if (!availableCategories.find((cat) => cat.name === selectedCategory)) {
      return alert("Category already used as menu or submenu");
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/menu/create-menu`, {
         method : "POST",
         credentials : "include",
         headers : {
          'Content-Type' : 'application/json'
         },
         body : JSON.stringify({
         menu: selectedCategory 
         })
        });
         console.log(selectedCategory);
         
        if(!res.ok){
          const data = await res.json();
          throw new Error(data.message || "Error on creating menu");
        }
        const data = await res.json();

      setMenus([...menus, data.payload.newMenu]); // Update state with new menu
      setSelectedCategory(""); // Reset selection
    } catch (error) {
      console.log(error);
    }
  };

  // Handle adding a submenu (only if category not used anywhere)
  // const handleAddSubmenu = async (e: React.FormEvent, menuId: string) => {
  //   e.preventDefault();
  //   if (!selectedSubmenu[menuId]) return alert("Please select a subcategory");

  //   // Check availability
  //   if (!availableCategories.find((cat) => cat.name === selectedSubmenu[menuId])) {
  //     return alert("Category already used as menu or submenu");
  //   }

  //   try {
  //      await api.post("/menu/create-submenu", {
  //       menuId,
  //       submenu: selectedSubmenu[menuId],
  //     });
  //     // Update the menus state with the new submenu
  //     setMenus(
  //       menus.map((menu) =>
  //         menu._id === menuId
  //           ? { ...menu, submenu: [...menu.submenu, selectedSubmenu[menuId]] }
  //           : menu
  //       )
  //     );
  //     // Reset the selected submenu for this menu
  //     setSelectedSubmenu({ ...selectedSubmenu, [menuId]: "" });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


// Delete a Menu by ID
const handleDeleteMenu = async (menuId: string) => {
  try {
    const res =  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/menu/delete-menu/${menuId}`,{
      method : "DELETE",
      credentials : "include"
     });

    if(!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Failed to delete menu");
    } 

    // Remove the deleted menu from state
    setMenus(menus.filter((menu) => menu._id !== menuId));
  } catch (error) {
    console.log(error);
  }
};

// Delete a Submenu (pass both menuId and the submenu string)
// const handleDeleteSubmenu = async (menuId: string, submenu: string) => {
//   try {
//      await api.delete("/menu/delete-submenu", {
//       data: { menuId, submenu },
//     });
//     // Update state by filtering out the deleted submenu from the specific menu
//     setMenus(
//       menus.map((menu) =>
//         menu._id === menuId
//           ? { ...menu, submenu: menu.submenu.filter((sub) => sub !== submenu) }
//           : menu
//       )
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };



  return (
    <div id="admin-content-layout">
      <div className="admin-content">
        <h2>Content Management</h2>

        {/* Create Menu Form */}
        <form onSubmit={handleCreateMenu} className="mb-5">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {availableCategories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <button type="submit">Add Menu</button>
        </form>


{menus.length > 0 &&
  menus.map((menu) => (
    <div key={menu._id} className="menu-card">
      <div className="menu-header">
        <p>{menu.menu}</p>
        <div className="menu-actions">
          <button onClick={() => handleDeleteMenu(menu._id)}>
            <MdDelete />
          </button>
        </div>
      </div>
      {/* Add Submenu Form */}
      {/* <form onSubmit={(e) => handleAddSubmenu(e, menu._id)}>
        <select
          value={selectedSubmenu[menu._id] || ""}
          onChange={(e) =>
            setSelectedSubmenu({
              ...selectedSubmenu,
              [menu._id]: e.target.value,
            })
          }
        >
          <option value="">Select Subcategory</option>
          {availableCategories.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Submenu</button>
      </form> */}
      {/* Show Submenus */}
      {/* {menu.submenu && menu.submenu.length > 0 && (
        <ul className="submenu-list">
          {menu.submenu.map((sub, index) => (
            <li key={index} className="d-flex align-items-center">
              <p>{sub}</p>
              <button
                onClick={() => handleDeleteSubmenu(menu._id, sub)}
              >
                <MdDelete />
              </button>
            </li>
          ))}
        </ul>
      )} */}
    </div>
  ))}


      </div>
    </div>
  );
}
