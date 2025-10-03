
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-MS9ELN2427"></script>
        {/*google search console*/}
        <script>
      {`
       window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-MS9ELN2427');
      `}
        </script>

        {/*META PIXEL BASE CODE HERE  */}
        <script>
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${process.env.META_PIXEL_ID}'); // Replace with your actual Pixel ID
            fbq('track', 'PageView');
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
