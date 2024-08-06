
//packages
import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';

//bootstrap minified css
import 'bootstrap/dist/css/bootstrap.min.css';

//router file
import { router } from './router';

//actions
import {loadAccessToken } from './features/authSlice';

//types
import { useAppDispatch, useAppSelector } from './app/hook';


function App() {

  const dispatch = useAppDispatch();

  //get user state from auth reducer
  const {user} = useAppSelector((state)=> state.auth);

  //dispatch the loadAccessToken if user null
  useEffect(()=>{
    if(user===null)
    dispatch(loadAccessToken());
  },[]);

  return (
    <>
    <RouterProvider router={router} />
     </>
  )
}

export default App
