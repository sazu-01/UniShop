//packages
import { Link } from "react-router-dom";

//icons
import { MdOutlineClose } from "react-icons/md";

//css
import "../css/Offcanvas.css";

//component
import HomeHeaderMenu from "../components/HomeHeaderMenu";
import { RxHamburgerMenu } from "react-icons/rx";

const Offcanvas = () => {
  return (
    
      <div id="offcanvas" data-bs-toggle="offcanvas">
        <RxHamburgerMenu  
        className="home-header-offcavas-toggle"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasWithBothOptions"
      aria-controls="offcanvasWithBothOptions"/>

        <div
          className="offcanvas offcanvas-start"
          data-bs-scroll="true"
          tabIndex={-1}
          id="offcanvasWithBothOptions"
          aria-labelledby="offcanvasWithBothOptionsLabel"
        >
          <div className="offcanvas-header">
            <Link
              to={`/`}
              className="offcanvas-title"
              id="offcanvasWithBothOptionsLabel"
            >
              unishop
            </Link>
            <MdOutlineClose
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body">
            <HomeHeaderMenu />
          </div>
        </div>
      </div>
    
  );
};

export default Offcanvas;
