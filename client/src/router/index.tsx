import { createBrowserRouter } from "react-router-dom";

import Root from "../Root";

//component
import { homePages } from "../components/DemosArray";
import GetShopComponent from "../components/GetShopComponent"

//home page
import Home from "../pages/Home";

export const router = createBrowserRouter([
    {            
  
        element: <Root />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          //markets route
          ...homePages.names.map((homePage) => ({
            path: homePage,
            element: GetShopComponent(homePage),
          })),
          
        ]
    
      },
])