
//packages
import Link from "next/link";

//css
import "@/css/BottomHeader.css"

//layout
import Navbar from "./Navbar";


const BottomHedaer = () => {

  return (
    <>
      <div className="bottom-header">
        <div className="bottom-header-content">

          <Navbar />
          <div className="side-nav">
            <div><Link href={`/`}>Home</Link></div>
            <div> <Link href={`/`}>Demos</Link></div>
            <div> <Link href={`/`}>Pages</Link></div>
            <div> <Link href={`/`}>User Account</Link></div>
            <div> <Link href={`/`}>Vendor Account</Link></div>
          </div>
        </div>
      </div>


    </>
  );
};

export default BottomHedaer;
