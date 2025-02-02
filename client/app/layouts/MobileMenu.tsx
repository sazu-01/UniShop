

//packages
import Link from "next/link";

//icons
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FiUser } from "react-icons/fi";


import MobileMenuNavigation from "./MobileMenuNavigation";

//css
import "@/css/MobileMenu.css"
import { useAppSelector } from "../lib/hook";



const MobileMenu = () => {
  
  const { cart } = useAppSelector((state)=> state.cart);
  
  return (
    <>
      <section id="bottom-menu">
        <Link href="/">
          <AiOutlineHome className="icon" />
          <span style={{fontSize:"1.2rem"}}>Home</span>
        </Link>

        <Link href="">
         <MobileMenuNavigation />
          <span style={{fontSize:"1.2rem"}}>Navigation</span>
        </Link>

        

        <Link href="/checkout/cart">
          <AiOutlineShoppingCart className="cart-icon" />
          <span className="responsive-cart-length">{cart.length}</span>
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