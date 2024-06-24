
//packages
import { Link } from "react-router-dom";

//css
import "../css/BottomHeader.css";

//layout
import Navbar from "./Navbar";


const BottomHedaer = () => {

  return (
    <>
      <div className="bottom-header">
        <div className="bottom-header-content">

          <Navbar />
          <div className="side-nav">
            <div><Link to={`/`}>Home</Link></div>
            <div> <Link to={`/`}>Demos</Link></div>
            <div> <Link to={`/`}>Pages</Link></div>
            <div> <Link to={`/`}>User Account</Link></div>
            <div> <Link to={`/`}>Vendor Account</Link></div>
          </div>
        </div>
      </div>


    </>
  );
};

export default BottomHedaer;
