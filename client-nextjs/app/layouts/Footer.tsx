
import Link from "next/link";

//css
import "@/css/Footer.css"

//icons
import {FaFacebookF,FaYoutube,FaTwitter,FaGoogle} from "react-icons/fa";
import {AiFillInstagram} from "react-icons/ai"
import { SiMinutemailer } from "react-icons/si";



const Footer = () => {
  return (
    <>
      <section id="footer">

        <div className="container footer-top">
         
         {/*brand details section*/}
        <div className="brand-details">
          <Link href={``} className="logo">unishop</Link>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia magni modi quo nostrum dolorum quae ullam rerum amet quis odit adipisicing elit.</p>
           
           <div className="footer-downlnad-btn">
              <button className="google-play-download">Google Play</button>
              <button className="app-store-download">App Store</button>
           </div>
        </div>

         {/*about section with navigation link*/}
        <div className="about-section">
          <h3>About us</h3>
          <Link href="/">About us</Link>
          <Link href="/">Shopee Blogs</Link>
          <Link href="/">contact with us</Link>
          <Link href="/">Shopee demo</Link>
          <Link href="/">privacy condition</Link>
          <Link href="/">contact with us</Link>
          <Link href="/">shopee demo</Link>
          

        </div>
      
        {/*customer care section with navigation link*/}  
        <div className="care-section">
          <h3>Customer Care</h3>
          <Link href="/">customer care</Link>
          <Link href="/">corporate order</Link>
          <Link href="/">refund and return policy</Link>
          <Link href="/">terms and condition</Link>
          <Link href="/">complain management</Link>
          <Link href="/">corporate order</Link>
          <Link href="/">refund and return policy</Link>

        </div>
        
        {/*contact information section*/}
        <div className="contact-section">
          <h3>Contact Us</h3>
          <div className="">
           <p className="address">70 Mugda, Madina bag, Dhaka 1214, Bangladesh</p>
           <p className="phone">Phone: 0889202456</p>
           <p className="Email">Email: admin@unishop.com</p>
            <div className="footer-input-section">
            <input type="text" />
             <button>  <SiMinutemailer  /></button>
            </div>
          </div>
          

        </div>


        </div>

        <hr  />

        <div className="container footer-bottom" >
            <div><p>@ 2024 unishop. All rights reserved</p></div>
          {/*social media icons*/}
          <div className="footer-icons">
            <li> <Link href='/'> <FaFacebookF className="icon" /> </Link> </li>
            <li><Link href='/'>  <FaYoutube className="icon" /></Link> </li>
            <li><Link  href=''>  <FaGoogle className="icon" /></Link> </li>
            <li><Link href='/'>  <AiFillInstagram className="icon" /></Link> </li>
            <li> <Link href='/'> <FaTwitter className="icon" /></Link> </li>
           </div>
        </div>
      </section>
    </>
  );
};

export default Footer;