
//packages
import { Link } from "react-router-dom";

//css
import "../css/TopHeader.css";

//icons
import { BiSolidPhoneCall } from "react-icons/bi";
import { IoIosMail } from "react-icons/io";


const TopHeader = () => {


  return (
    <div className="topheader" >
      <div className="topheader-content">

        <div className="responsive-logo">
          <Link to={`/`}>unishop</Link>
        </div>

        <div className="topheader-left">

          <div className="topheader-contact-item">
            <BiSolidPhoneCall className="topheader-icon" />
            <span>0995822159</span>
          </div>

          <div className="topheader-contact-item">
            <IoIosMail className="topheader-icon" />
            <span>care@unishop.com</span>
          </div>

        </div>

        <div className="topheader-right">
          <Link to={`/my-order`}>Track My Order</Link>
          <Link to={`/`}>Need Help</Link>
        </div>

      </div>
    </div>
  )
}

export default TopHeader