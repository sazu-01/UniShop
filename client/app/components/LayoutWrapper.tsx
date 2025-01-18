
'use client'

import { usePathname } from "next/navigation";
import HomeHeader from "../layouts/HomeHeader";
import HomeCover from "../layouts/HomeCover";
import Demos from "../layouts/Demos";
import Header from "../layouts/Header";
import MobileMenu from "../layouts/MobileMenu";
import Footer from "../layouts/Footer";
import { ReactNode } from "react";

interface LayoutWrapperProps{
    children : ReactNode
}

export default function LayoutWrapper({ children } : LayoutWrapperProps) {
  const pathname = usePathname();
  
  return (
    <>
      {pathname === "/" ? (
        <>
          <HomeHeader />
          <HomeCover />
          <Demos />
        </>
      ) : (
        <Header />
      )}
      {children}
      {pathname === "/" ? null : (
        <>
          <MobileMenu />
          <Footer />
        </>
      )}
    </>
  );
}