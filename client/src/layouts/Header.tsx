
//packages
import { Outlet } from "react-router-dom";
//layout
import TopHeader from "./TopHeader";
import MiddleHeader from "./MiddleHeader";
import BottomHeader from "./BottomHeader";

const Header = () => {
  return (
    <>
   <TopHeader bgColor="#111" color="#fff" />
   <MiddleHeader /> 
   <BottomHeader />
   <Outlet />
    </>
  )
}

export default Header