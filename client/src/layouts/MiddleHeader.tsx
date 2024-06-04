//packages
import { Link } from "react-router-dom";

//icons
import { UserIcon } from "../components/SVG";
import { CartIcon } from "../components/SVG";
import { HeartIcon } from "../components/SVG";
import { SearchIcon } from "../components/SVG";
import { IoIosArrowDown } from "react-icons/io";


//css
import "../css/MiddleHeader.css";

const MiddleHeader = () => {
  return (
    <>
      <div className="middle_header">
        <div className="middle_header_content">

          <div className="middle_header_logo">
            <Link to={`/`}>unishop</Link>
          </div>

          <div className="middle_header_search_wrapper">
            <input type="text" className="" placeholder="Search Products Like Mouse Keyboard" />
            <button><SearchIcon /></button>
            <div className="search_categories">
                <p>All Categories <span><IoIosArrowDown /></span></p>
            </div>
          </div>

          <div className="middle_header_icons">

            <Link to={`/`}>
              <div className="middle_header_user">
                <UserIcon />
              </div>
            </Link>

            <Link to={`/`} >
              <div className="middle_header_notification">
                <HeartIcon />
              </div>

            </Link>

            <Link to={`/`}>
              <div className="middle_header_cart">
                <CartIcon />
              </div>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default MiddleHeader;
