
//packages
import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';

//bootstrap minified css
import 'bootstrap/dist/css/bootstrap.min.css';

//router file
import { router } from './router';

//actions
import {loadAccessToken } from './features/authSlice';
import { getProduct } from './features/productSlice';

//types
import { useAppDispatch, useAppSelector } from './app/hook';


function App() {

  const dispatch = useAppDispatch();

  //get user state from auth reducer
  const {user} = useAppSelector((state)=> state.auth);


  /*dispatch the loadAccessToken if user null & 
  dispatch getProduct once whenever reload the application*/
  useEffect(()=>{
    if(user===null) dispatch(loadAccessToken());
    dispatch(getProduct());
  },[]);




  return (
    <>
    <RouterProvider router={router} />
     </>
  )
}

export default App
