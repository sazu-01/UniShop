//packages
import { Link } from "react-router-dom";

//icons
import { HamburgerMenu } from "../components/SVG";
import { IoIosArrowDown } from "react-icons/io";

//css
import "../css/BottomHeader.css";

const BottomHedaer = () => {
  return (
    <div className="bottom_header">
      <div className="bottom_header_content">
        <div className="category_dropdown">
          <p className="">
            {" "}
            <HamburgerMenu />
            <span className="ps-3">Browse Categories</span>
          </p>

          <span>
            {" "}
            <IoIosArrowDown />
          </span>
        </div>

        <div className="side_nav">
         <div><Link to={`/`}>Home</Link></div> 
         <div> <Link to={`/`}>Demos</Link></div> 
         <div> <Link to={`/`}>Pages</Link></div>
         <div> <Link to={`/`}>User Account</Link></div>
         <div> <Link to={`/`}>Vendor Account</Link></div>
        </div>
      </div>
    </div>
  );
};

export default BottomHedaer;
