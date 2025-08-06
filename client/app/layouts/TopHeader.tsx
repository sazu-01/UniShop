
//packages
import Link from "next/link";

//css
import "@/css/TopHeader.css";

//icons
import { BiSolidPhoneCall } from "react-icons/bi";
import { IoIosMail } from "react-icons/io";


const TopHeader = () => {


  return (
    <div className="topheader">
      <div className="topheader-content">

        <div className="responsive-logo">
          <Link href={`/`}>unishop</Link>
        </div>

        <div className="topheader-left">

          <div className="topheader-contact-item">
            <BiSolidPhoneCall className="topheader-icon" />
            <span>01600930467</span>
          </div>

          <div className="topheader-contact-item">
            <IoIosMail className="topheader-icon" />
            <span>unishop72@gmail.com</span>
          </div>

        </div>

        <div className="topheader-right">
          <Link href={`https://www.facebook.com/unishop.cloth`} target="blank">Track My Order</Link>
          <Link href={`https://www.facebook.com/unishop.cloth`} target="blank">Need Help</Link>
        </div>

      </div>
    </div>
  )
}

export default TopHeader