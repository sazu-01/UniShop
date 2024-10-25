
//packages
import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';

//bootstrap minified css
import 'bootstrap/dist/css/bootstrap.min.css';

//router file
import { router } from './router';

//actions
import {getCurrentUser } from './features/authSlice';
import { getProduct } from './features/productSlice';

//types
import { useAppDispatch, useAppSelector } from './app/hook';


function App() {

  const dispatch = useAppDispatch();

  //get user state from auth reducer
  const {isLoggedIn} = useAppSelector((state)=> state.auth);

  useEffect(()=>{
  
    dispatch(getProduct());

    const isLoggedInLocal = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedInLocal && !isLoggedIn) {
      dispatch(getCurrentUser());
    }
  },[dispatch, isLoggedIn]);




  return (
    <>
    <RouterProvider router={router} />
     </>
  )
}

export default App
