
//packages
import { Link } from "react-router-dom";

//css
import "../css/TopHeader.css";

//icons
import { BiSolidPhoneCall } from "react-icons/bi";
import { IoIosMail } from "react-icons/io";


const TopHeader = (props:any) => {
  

  return (
    <div className="topheader" style={{backgroundColor:props.bgColor,color:props.color }} >
      <div className="container">

        <div className="topheader_left">

          <div className="topheader_contact_item">
           <BiSolidPhoneCall className="topheader_icon" />
            <span>0995822159</span>
          </div>

          <div className="topheader_contact_item">
            <IoIosMail className="topheader_icon" />
            <span>care@unishop.com</span>
          </div>

        </div>

        <div className="topheader_right">
          <Link style={{color:props.color}} to={`/my-order`}>Track My Order</Link>
          <Link style={{color:props.color}} to={`/`}>Need Help</Link>
        </div>

      </div>
    </div>
  )
}

export default TopHeader