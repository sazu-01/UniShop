


//packages
import { Link } from "react-router-dom";

//icons
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FiUser } from "react-icons/fi";


// import { RiCustomerService2Fill } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";


//css
import "../css/MobileMenu.css"

// import UserDashboard from "../pages/dashboards/UserDashboard";


const MobileMenu = () => {
  


  return (
    <>
      <section id="bottom-menu">
        <Link to="/">
          <AiOutlineHome className="icon" />
          <span style={{fontSize:"1.2rem"}}>Home</span>
        </Link>

        <Link to="/mobile-navbar">
          <HiOutlineMenu className="icon" />
          <span style={{fontSize:"1.2rem"}}>Navigation</span>
        </Link>

        <Link to="/checkout/cart">
          <AiOutlineShoppingCart className="cart-icon" />
          <span className="responsive-cart-length">5</span>
          <span style={{fontSize:'1.2rem'}}>Cart</span>
        </Link>

        <Link to={`user/dashboard`} >
          <FiUser className="icon" />{" "}
          <span style={{fontSize:"1.2rem"}}>Dashboard</span>
        </Link>
        

      </section>
    </>
  );
};

export default MobileMenu;