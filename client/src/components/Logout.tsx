import React, { FormEvent } from 'react';
import { useAppDispatch } from '../app/hook';

import { logout } from '../features/authSlice';


const Logout: React.FC = () => {


  const dispatch = useAppDispatch();

  
  //logout submission
  const handleLogout = async (e:FormEvent) => {
    e.preventDefault();
    dispatch(logout());
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;