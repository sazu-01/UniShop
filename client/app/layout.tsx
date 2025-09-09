
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvide";
import GlobalDataProvider from "./components/GlobalDataProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import LayoutWrapper from "./components/LayoutWrapper";
import "swiper/css";
import "swiper/css/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pacyfic - Best Clothing Shop in Bangladesh",
  description: "Pacyfic is the best clothing e-commerce in bangladesh. make ensure the quality of cloth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-YVCFPKQ10K"></script>
        <script>
          {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-YVCFPKQ10K');
   `}
        </script>

      </head>
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
