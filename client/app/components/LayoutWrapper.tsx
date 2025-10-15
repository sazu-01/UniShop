"use client";

import Header from "../layouts/Header";
import MobileMenu from "../layouts/MobileMenu";
import Footer from "../layouts/Footer";
import FixedCart from "./FixedCart";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  
  const pathName = usePathname();
  return (
    <>
      <Header />
      {children}
      {pathName === "/" ?  null : <FixedCart /> }
      <Footer />
      <MobileMenu />
    </>
  );
}
