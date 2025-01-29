

"use client";
import { useEffect, useState } from 'react';
import { api } from "@/app/utili/axiosConfig";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res =  api.get('/auth/protected');
        console.log(res);
        
        setIsAuthorized(true);
      } catch (error) {
      console.log(error);
      }
    };

    checkAuth();
  }, []);

  return isAuthorized ? children : null;
}