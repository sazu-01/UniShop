
"use client"

//packages
import React,{useEffect, useState} from "react";
import Link from "next/link";
import slugify from "slugify";

//icons
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { api } from "../utili/axiosConfig";
//css

import "@/css/Navbar.css";

interface MenuType {
  _id: string;
  menu: string;
  submenu: string[];
}


const Navbar = () => {

  //state to manage whether the menu is being hovered over
  const [isHovering , setIsHovering] = useState(false);

  const [menus, setMenus] = useState<MenuType[]>([]);

      // Fetch all menus
      const handleGetAllMenu = async () => {
        try {
          const { data } = await api.get("/menu/all-menu");
          setMenus(data.payload.allMenu);
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(()=>{
        handleGetAllMenu()
      },[])

  //function to handle mouse enter event
  const handleMouseEnter = () => {
    setIsHovering(true)
}

  //function to handle mouse leave event
  const handleMouseLeave = () => {
     setIsHovering(false);
  }

  return (
    <div className="side-menu"  onMouseLeave={handleMouseLeave}>
      <div className="dropdown-toggler" onMouseEnter={handleMouseEnter}>
        <p className="">
          {" "}
          {!isHovering ? (
            <RxHamburgerMenu className="dropdown-toggle-menu" />
          ) : (
            <IoClose className="dropdown-close-menu" />
          )}
          <span className="">Categories</span>
        </p>

        <span>
          {" "}
          <IoIosArrowDown />
        </span>
      </div>

      <nav className={isHovering ? "menubar-block" : "menubar-none"}>
        <div className="menubar-wrapper">
          {menus.map((Nav, i) => {
            const link = slugify(Nav.menu, { lower: true, strict: true }); 
            return (
              <li key={i}>
                {" "}
                <Link href={`/${link}`}>{Nav.menu}</Link>
                <ul className="dropmenu">
                  {/* dropmenu for categories */}
                  {/* {Nav.submenu.map((c, i) => {
                   const sublink = slugify(c, { lower: true, strict: true }); 
                    return (
                      <React.Fragment key={i}>
                        {c === "" ? null : (
                          <li>
                            <Link href={`/${sublink}`}>{c}</Link>
                          </li>
                        )}
                      </React.Fragment>
                    );
                  })} */}
                </ul>
              </li>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
