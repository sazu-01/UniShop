"use client"

import Link from "next/link";

//css
import "@/css/Footer.css"

//icons
import { FaFacebookF, FaYoutube, FaTiktok } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai"
import { SiMinutemailer } from "react-icons/si";
import { CgMail } from "react-icons/cg";



const Footer = () => {
  return (
    <>
      <section id="footer">

        <div className="footer-content">

          <div className=" footer-top">
            
            {/*brand details section*/}
            <div className="brand-details">
              <Link href={``} className="logo">unishop</Link>

              <p>Our journey began with a simple goal: to bring high quality fashion to everyone in Bangladesh at affordable prices. We believe clothing should not only make you look good but also make you feel confident.</p>

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
                <p className="phone">Whatsapp: 01600930467</p>
                <p className="Email">Email: unishop72@gmail.com</p>
                <div className="footer-input-section">
                  <input type="text" />
                  <button>  <SiMinutemailer /></button>
                </div>
              </div>
            </div>
            
          </div>

          <hr />

          <div className=" footer-bottom" >
            <div><p>@ 2024 unishop. All rights reserved</p></div>
            {/*social media icons*/}
            <div className="footer-icons">
              <li> <Link href='https://www.facebook.com/unishop.cloth' target="blank"> <FaFacebookF className="icon" /> </Link> </li>
              <li><Link href='https://www.youtube.com/@unishopofficial' target="blank">  <FaYoutube className="icon" /></Link> </li>
              <li><Link href='https://mail.google.com/mail/?view=cm&fs=1&to=unishop72@gmail.com' target="blank">  <CgMail className="icon" /></Link> </li>
              <li><Link href='https://www.instagram.com/unishop.bd' target="blank">  <AiFillInstagram className="icon" /></Link> </li>
              <li> <Link href='https://www.tiktok.com/@unishop.cloth' target="blank"> <FaTiktok className="icon" /></Link> </li>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Footer;