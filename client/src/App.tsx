
//packages
import { RouterProvider } from 'react-router-dom';

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
