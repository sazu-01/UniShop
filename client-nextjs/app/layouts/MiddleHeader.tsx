'use client'

//packages
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "@/app/lib/hook";

//icons
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { MdOutlineShoppingBag } from "react-icons/md";
import Login from "./Login";

//css
import "@/css/MiddleHeader.css";



const MiddleHeader = () => {

  //get the user from auth slice
  const { user } = useAppSelector((state) => state.auth);

  
  return (
    <div className="middle-header">
      <div className="middle-header-content">


        <div className="middle-header-logo">
          <Link href={`/`}>unishop</Link>
        </div>

        <div className="middle-header-search-wrapper">
          <input type="text" className="" placeholder="search phone, watch, shirt..." />
          <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </div>

        <div className="middle-header-icons">

        {user !== null ? <Link href={`/user/dashboard`}> <div className="middle-header-user">
            <FontAwesomeIcon icon={faUser} style={{ fontSize: "1.7rem", color: "#000" }} />
          </div></Link> :  <Login />}
          <Link href={`/`} >


            <div className="middle-header-notification">
              <FontAwesomeIcon icon={faHeart} style={{ fontSize: "2rem", color: "#000" }} />
            </div>

          </Link>

          <Link href={`/`}>
            <div className="middle-header-cart">
              <MdOutlineShoppingBag style={{ fontSize: "2.3rem", color: "#000" }} />
            </div>
          </Link>
        </div>

      </div>
    </div>

  );
};

export default MiddleHeader;
