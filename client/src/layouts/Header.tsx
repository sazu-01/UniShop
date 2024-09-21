
//packages
import { Outlet } from "react-router-dom";
//layout
import TopHeader from "./TopHeader";
import MiddleHeader from "./MiddleHeader";
import BottomHeader from "./BottomHeader";

const Header = () => {
  return (
    <>
   <TopHeader />
   <MiddleHeader /> 
   <BottomHeader />
   <Outlet />
    </>
  )
}

export default Header