import { createBrowserRouter } from "react-router-dom";

import Root from "../Root";

//component
import { homePages } from "../components/DemosArray";
import GetShopComponent from "../components/GetShopComponent"

//pages
import Home from "../pages/Home";
import Register from "../pages/auth/Register";
import ActivateEmail from "../pages/auth/ActivateEmail";
import Login from "../pages/auth/Login";
import SingleProduct from "../pages/SingleProduct";
import UserDashboard from "../pages/dashboards/UserDashboard";
import Cart from "../pages/checkout/Cart";
import Shipping from "../pages/checkout/Shipping";


export const router = createBrowserRouter([
    {            
  
        element: <Root />,
        children: [
          {
            path: "/",
            element: <Home />,
          },

              {
                path: "/register",
                element : <Register />
              },
              {
                path: "/login",
                element: <Login />
              },
              {
                path : `/api/users/activate/:token`,
                element : <ActivateEmail/>,
              },
              {
                path : "/user/dashboard",
                element : <UserDashboard />
              },
              //markets route
              ...homePages.names.map((homePage) => ({
                path: homePage,
                element: GetShopComponent(homePage),
              })),
    
              {
                path : "/product/:slug",
                element : <SingleProduct />
              },
              {
                path : "/checkout/cart",
                element : <Cart />
              },
              {
                path : "/checkout/shipping",
                element : <Shipping />
              }
            
          
          
          
        ]
    
      },
])