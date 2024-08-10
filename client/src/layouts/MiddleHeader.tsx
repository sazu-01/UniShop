
//packages
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//auth 
import Login from "../pages/auth/Login";

//icons
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { MdOutlineShoppingBag } from "react-icons/md";


//css
import "../css/MiddleHeader.css";


const MiddleHeader = () => {

  const isLoggedin = true;
  return (
    <div className="middle-header">
      <div className="middle-header-content">


        <div className="middle-header-logo">
          <Link to={`/`}>unishop</Link>
        </div>

        <div className="middle-header-search-wrapper">
          <input type="text" className="" placeholder="search phone, watch, shirt..." />
          <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </div>

        <div className="middle-header-icons">
          {isLoggedin ? <Login /> : <Link to={'/register'}>

            <div className="middle-header-user">
            <FontAwesomeIcon icon={faUser} style={{ fontSize: "1.7rem", color: "#000" }} />
            </div>
          </Link>}


          <Link to={`/`} >
            <div className="middle-header-notification">
              <FontAwesomeIcon icon={faHeart} style={{ fontSize: "2rem", color: "#000" }} />
            </div>

          </Link>

          <Link to={`/`}>
            <div className="middle-header-cart">
              <MdOutlineShoppingBag style={{ fontSize: "2.3rem", color: "#000" }} />
            </div>
          </Link>
        </div>

      </div>
    </div>

  );
};

export default MiddleHeader;
