
//packages
import React from "react";
import { Link } from "react-router-dom";

//component
import { Navigation } from "../components/Navigation";

//icons
import { GiAmpleDress } from "react-icons/gi";


//css
import "../css/Navbar.css";


const Navbar = () => {


  return (

    <nav className="menubar">
      <div className="menubar-wrapper">
        {Navigation.map((nav, i) => {
          return <li key={i}> <span><GiAmpleDress /></span> <p>{nav.title}</p>
            <ul className="dropmenu">{nav.categorise.map((c, i) => {

              return <React.Fragment key={i}>
                {c === "" ? null : <li><Link to={`/`}>{c}</Link></li>}
              </ React.Fragment>
            })}</ul>
          </li>
        })}
        {/*  */}
      </div>
    </nav>
  )
}

export default Navbar