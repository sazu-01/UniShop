
//packages
import { RouterProvider } from 'react-router-dom';

//bootstrap minified css
import 'bootstrap/dist/css/bootstrap.min.css';

//router file
import { router } from './router'

function App() {

  return (
    <>
    <RouterProvider router={router} />
     </>
  )
}

export default App
