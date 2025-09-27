"use client";

import Header from "../layouts/Header";
import MobileMenu from "../layouts/MobileMenu";
import Footer from "../layouts/Footer";
import Messenger from "./Messenger";
import { ReactNode } from "react";

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <>
      <Header />
      {children}
      <Messenger />
      <Footer />
      <MobileMenu />
    </>
  );
}
