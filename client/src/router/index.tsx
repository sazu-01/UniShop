import { createBrowserRouter } from "react-router-dom";

import Root from "../Root";

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
          
        ]
    
      },
])