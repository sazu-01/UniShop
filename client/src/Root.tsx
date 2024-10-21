
//packages
import { Outlet , useLocation } from 'react-router-dom'

//layout
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import MobileMenu from './layouts/MobileMenu';

const Root = () => {

  const location = useLocation();

  //check if the current path is not the home page ("/")
  const isHomePage = location.pathname === "/";

  return (
    <>
    {!isHomePage && <Header />} {/* Render Header if not on the Home page */}
     {isHomePage && <Outlet />  } 
      {!isHomePage && <MobileMenu />}
      {!isHomePage && <Footer />} {/* Render Footer if not on the Home page */}
    </>
  )
}

export default Root