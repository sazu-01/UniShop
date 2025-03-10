
'use client';

import { useAppDispatch, useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import { useEffect } from "react";
import { getProduct } from "../lib/features/productSlice";
import { getCurrentUser, loadAccessToken } from "../lib/features/authSlice";
import { initializeCart } from "../lib/features/cartSlice";

export default function GlobalDataProvider({
    children,
  }: {
    children: React.ReactNode
  }) {
    const dispatch = useAppDispatch()
    const { isLoggedIn } = useAppSelector((state: RootState) => state.auth)
  
    useEffect(() => {
      dispatch(getProduct())

      dispatch(initializeCart());
      
      const isLoggedInLocal = localStorage.getItem('isLoggedIn') === 'true'
      if (isLoggedInLocal && !isLoggedIn) {
        dispatch(getCurrentUser());
        dispatch(loadAccessToken());
      }
    }, [dispatch, isLoggedIn])
  
    return <>{children}</>
  }