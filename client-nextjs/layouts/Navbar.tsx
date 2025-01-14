
"use client"

//packages
import React,{useState} from "react";
import Link from "next/link";

//component
import { Navigation } from "./Navigation";

//icons
import { PiDressDuotone } from "react-icons/pi";
import { FaLaptop } from "react-icons/fa";
import { RiSofaLine } from "react-icons/ri";
import { GiTomato } from "react-icons/gi";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { IoLogoOctocat } from "react-icons/io";
import { PiNotebookBold } from "react-icons/pi";
import { BiFileBlank } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

//css

import "../css/Navbar.css";


const Navbar = () => {

  //object to map icon names to the corresponding icon components
  const IconComponents = {
    PiDressDuotone,
    FaLaptop,
    RiSofaLine,
    GiTomato,
    AiOutlineMedicineBox,
    IoLogoOctocat,
    PiNotebookBold,
    BiFileBlank,
  };

  //state to manage whether the menu is being hovered over
  const [isHovering , setIsHovering] = useState(false);

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
          {Navigation.map((Nav, i) => {
          //dynamically selecting the icon component
          const IconComponent=IconComponents[Nav.icon as keyof typeof IconComponents];
            return (
              <li key={i}>
                {" "}
                <span>{IconComponent && <IconComponent />}</span>{" "}
                <p>{Nav.title}</p>
                <ul className="dropmenu">
                  {/* dropmenu for categories */}
                  {Nav.categorise.map((c, i) => {
                    return (
                      <React.Fragment key={i}>
                        {c === "" ? null : (
                          <li>
                            <Link href={`/`}>{c}</Link>
                          </li>
                        )}
                      </React.Fragment>
                    );
                  })}
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
