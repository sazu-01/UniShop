

"use client";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {

  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res =  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/protected`,{
          method : "GET",
          credentials : "include",
          headers : {
            "Content-Type" : "application/json"
          }
        });
        
        if(res.ok) {
         setIsAuthorized(true);
        }else {
          router.replace('/')
        }
        
    
      } catch (error) {
      console.log(error);
      }
    };

    checkAuth();
  }, [router]);

  return isAuthorized ? children : null;
}