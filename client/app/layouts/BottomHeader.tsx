"use client"
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
            <div><Link href={`/salwar-kameez`}>Salwar Kameeez</Link></div>
            <div> <Link href={`/sharee`}>Sharee</Link></div>
            <div> <Link href={`/kurti`}>Kurti</Link></div>
            <div> <Link href={`/register`}>Create Account</Link></div>
          </div>
        </div>
      </div>


    </>
  );
};

export default BottomHedaer;
