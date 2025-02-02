//packages
import { useState } from "react";

//icons
import { MdOutlineClose } from "react-icons/md";

//boostrap component
import Offcanvas from "react-bootstrap/Offcanvas";

import { Navigation } from "./Navigation";

//css
import "@/css/MobileMenuNavigation.css";

//component

import { RxHamburgerMenu } from "react-icons/rx";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const MobileMenuNavigation = () => {
  const [show, setShow] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleCategory = (index: any) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  return (
    <>
      <RxHamburgerMenu
        onClick={handleShow}
        className="offcavas-toggle"
      />

      <Offcanvas show={show} onHide={handleClose} className="mobile-menu-offcanvas">
        <Offcanvas.Header closeButton={false}>
          <Offcanvas.Title>unishop</Offcanvas.Title>
          <MdOutlineClose onClick={handleClose} className="btn-close" />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="menu-list">
            {Navigation.map((item, index) => (
              <li key={index} className="menu-item">
                <div
                  className="menu-title"
                  onClick={() => toggleCategory(index)}
                >
                  <span>{item.title}</span>
                  {openCategory === index ? (
                    <FaChevronUp className="chevron-icon" />
                  ) : (
                    <FaChevronDown className="chevron-icon" />
                  )}
                </div>
                {openCategory === index && (
                  <ul className="submenu">
                    {item.categorise.map((cat, idx) => (
                      <li key={idx} className="submenu-item">
                        {cat}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MobileMenuNavigation;
