import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvide";
import GlobalDataProvider from "./components/GlobalDataProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import LayoutWrapper from "./components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 

 {
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: "#F6F6F6", scrollBehavior: "smooth" }}
      >
        <StoreProvider>
          <GlobalDataProvider>
            <LayoutWrapper>
            {children}
            </LayoutWrapper>
          </GlobalDataProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
