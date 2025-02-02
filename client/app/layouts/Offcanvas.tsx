
//packages
import { useState } from "react";

//icons
import { MdOutlineClose } from "react-icons/md";

//boostrap component
import Offcanvas from 'react-bootstrap/Offcanvas';


//css
import "@/css/Offcanvas.css";

//component
import HomeHeaderMenu from "@/app/components/HomeHeaderMenu";
import { RxHamburgerMenu } from "react-icons/rx";

const OffcanvasFun = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (

      <>
      <RxHamburgerMenu  onClick={handleShow} className="home-header-offcavas-toggle" />

    <Offcanvas show={show} onHide={handleClose} className="header-offcanvas">
      <Offcanvas.Header closeButton={false}>
        <Offcanvas.Title>unishop</Offcanvas.Title>
        <MdOutlineClose 
            onClick={handleClose} 
            className="btn-close"
          />
      </Offcanvas.Header>
      <Offcanvas.Body>
      <HomeHeaderMenu />
      </Offcanvas.Body>
    </Offcanvas>
    </>
  );
};

export default OffcanvasFun;
