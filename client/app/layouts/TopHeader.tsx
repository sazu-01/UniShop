
//packages
import Link from "next/link";

//css
import "@/css/TopHeader.css";

//icons
import Image from "next/image";

const TopHeader = () => {


  return (
    <div className="topheader">
      <div className="topheader-content">

        <div className="responsive-logo">
          <a href={`/`}>PACYFIC</a>
        </div>

        <div className="topheader-left">
          <div>
            <p className="text-white">Welcome to pacyfic</p>
          </div>
        </div>

        <div className="topheader-right">

          <div className="topheader-contact-item">
            <Link href={'https://api.whatsapp.com/send?phone=8801600930467'} target="blank">
            <Image width={20} height={20} src='/whatsapp.png' alt="whatsapp" className="topheader-icon" />
            <span>01600930467</span>
            </Link>
          </div>

          <div className="topheader-contact-item">
            <Link href={'https://m.me/659299587268782'} target="blank">
            <Image src={'/messenger1.png'} width={23} height={23} alt="" /> 
            <span>Message us</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default TopHeader