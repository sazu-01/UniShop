


//packages
import Link from "next/link";

//icons
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FiUser } from "react-icons/fi";


// import { RiCustomerService2Fill } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";


//css
import "@/css/MobileMenu.css"



const MobileMenu = () => {
  


  return (
    <>
      <section id="bottom-menu">
        <Link href="/">
          <AiOutlineHome className="icon" />
          <span style={{fontSize:"1.2rem"}}>Home</span>
        </Link>

        <Link href="/mobile-navbar">
          <HiOutlineMenu className="icon" />
          <span style={{fontSize:"1.2rem"}}>Navigation</span>
        </Link>

        <Link href="/checkout/cart">
          <AiOutlineShoppingCart className="cart-icon" />
          <span className="responsive-cart-length">5</span>
          <span style={{fontSize:'1.2rem'}}>Cart</span>
        </Link>

        <Link href={`/user/dashboard`} >
          <FiUser className="icon" />{" "}
          <span style={{fontSize:"1.2rem"}}>Dashboard</span>
        </Link>
        

      </section>
    </>
  );
};

export default MobileMenu;