
//packages
import { useState, useEffect } from "react";
import slugify from "slugify";
import Link from "next/link";
//icons
import { MdOutlineClose } from "react-icons/md";

//boostrap component
import Offcanvas from "react-bootstrap/Offcanvas";
import { api } from "../utili/axiosConfig";

//css
import "@/css/MobileMenuNavigation.css";

//component
import { RxHamburgerMenu } from "react-icons/rx";


interface MenuType {
  _id: string;
  menu: string;
  submenu: string[];
}


const MobileMenuNavigation = () => {
  const [show, setShow] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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
            {menus.map((item, index) => { 
              const link = slugify(item.menu, {lower : true, strict: true})
            return  (
                
              <li key={index} className="menu-item" >
                <Link 
                  href={`/${link}`}
                  className="menu-title"
                  onClick={handleClose}
                >
                  <span>{item.menu}</span>
                  {/* {openCategory === index ? (
                    <FaChevronUp className="chevron-icon" />
                  ) : (
                    <FaChevronDown className="chevron-icon" />
                  ) } */}
                </Link>
                

              </li>
            )})}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MobileMenuNavigation;
