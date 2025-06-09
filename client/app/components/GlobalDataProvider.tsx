
'use client';

import { useAppDispatch, useAppSelector } from "../lib/hook";
// import { RootState } from "../lib/store";
import { useEffect } from "react";
import { getProduct } from "../lib/features/productSlice";
import { initializeCart } from "../lib/features/cartSlice";
import { getCurrentUser } from "../lib/features/authSlice";
export default function GlobalDataProvider({
    children,
  }: {
    children: React.ReactNode
  }) {
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      dispatch(getProduct())
      dispatch(initializeCart());
   
      
      const isLoggedInLocal = localStorage.getItem('isLoggedIn') === 'true'
      if (isLoggedInLocal) {
        dispatch(getCurrentUser());
      }
    }, [dispatch])
  
    return <>{children}</>
  }