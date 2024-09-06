
import { Link } from "react-router-dom";
//css
import "../css/Footer.css";

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
          <Link to={``} className="logo">unishop</Link>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia magni modi quo nostrum dolorum quae ullam rerum amet quis odit adipisicing elit.</p>
           
           <div className="footer-downlnad-btn">
              <button className="google-play-download">Google Play</button>
              <button className="app-store-download">App Store</button>
           </div>
        </div>

         {/*about section with navigation link*/}
        <div className="about-section">
          <h3>About us</h3>
          <Link to="/">About us</Link>
          <Link to="/">Shopee Blogs</Link>
          <Link to="/">contact with us</Link>
          <Link to="/">Shopee demo</Link>
          <Link to="/">privacy condition</Link>
          <Link to="/">contact with us</Link>
          <Link to="/">shopee demo</Link>
          

        </div>
      
        {/*customer care section with navigation link*/}  
        <div className="care-section">
          <h3>Customer Care</h3>
          <Link to="/">customer care</Link>
          <Link to="/">corporate order</Link>
          <Link to="/">refund and return policy</Link>
          <Link to="/">terms and condition</Link>
          <Link to="/">complain management</Link>
          <Link to="/">corporate order</Link>
          <Link to="/">refund and return policy</Link>

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
            <li> <Link to='/'> <FaFacebookF className="icon" /> </Link> </li>
            <li><Link to='/'>  <FaYoutube className="icon" /></Link> </li>
            <li><Link  to=''>  <FaGoogle className="icon" /></Link> </li>
            <li><Link to='/'>  <AiFillInstagram className="icon" /></Link> </li>
            <li> <Link to='/'> <FaTwitter className="icon" /></Link> </li>
           </div>
        </div>
      </section>
    </>
  );
};

export default Footer;