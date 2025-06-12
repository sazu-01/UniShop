
"use client";

//packages
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

//icons
import { FaRegEye, FaFacebook, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

// action slice 
import { signInStart,  signInSuccess, signInFailure, } from "@/app/lib/features/authSlice";

//custom hooks
import { useAppDispatch, useAppSelector } from '@/app/lib/hook';

//css
import "@/css/Login.css"

const Login = () => {

    const [formData, setFormData] = useState({});
     const handleChange = (e : any) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
    
      //state for password visibility
      const [seePassword, setSeepasswrod] = useState(false);
    
      const dispatch = useAppDispatch();
      const router = useRouter();
      const searchParams = useSearchParams();
      const redirect = searchParams.get('redirect') || '/'
      console.log(redirect);
      
      const isLoading = useAppSelector((state) => state.auth.isLoading);
    
       
      //handle form submission
      const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
         try {
          dispatch(signInStart());
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
    
            body: JSON.stringify(formData),
          });
              
          const data = await res.json();
          
          if (res.ok === false) {
            dispatch(signInFailure(data));
            return;
          }
          dispatch(signInSuccess(data));
          localStorage.setItem("isLoggedIn", "true");
          router.push(redirect);
    
        } catch (error) {
          dispatch(signInFailure(error));
        }
      }


  return (
    <>


<div id="login">
  <div className="login-content">
    <form onSubmit={handleLogin} className="login-form">
      <h2 className="login-title">Login</h2>
      <p className="login-subtitle">Login with your email and password</p>
      
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email</label>
        <input
          type="email"
          onChange={handleChange}
          className="input-field"
          id="email"
          placeholder="Enter your email"
          autoComplete="none"
          required
        />
      </div>
      
      <div className="form-group" id="password">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type={seePassword ? `text` : `password`}
          onChange={handleChange}
          className="input-field"
          id="password"
          placeholder="Enter your password"
          autoComplete="none"
          required
        />
        <button
          type="button"
          className="hide-show-password"
          onClick={() => setSeepasswrod(!seePassword)}
        >
          {seePassword ? (
            <FaRegEye type="checkbox" className="see" />
          ) : (
            <FaRegEyeSlash className="dont-see" />
          )}
        </button>
      </div>
      
      <p
        className="forgot-password"
        onClick={() => alert("Forget password function will be update")}
      >
        Forgot Password?
      </p>
      
      <button type="submit" className="sign-in-btn">
        {isLoading ? "Logging in..." : "Login"}
      </button>
      
      <div className="or">
        <div className="line"></div>
        <div className="text">
          <span>or</span>
        </div>
      </div>
      
      <div className="facebook-signin-option" onClick={() => alert("This feature not valid yet, please register with gmail")}>
        <div className="facebook-signin-icon">
          <FaFacebook className="facebook-icon" />
        </div>
        <span>Sign in with Facebook</span>
      </div>
      
      <div className="google-signin-option" onClick={() => alert("This feature not valid yet, please register with gmail")}>
        <div className="google-signin-icon">
          <FcGoogle className="google-icon" />
        </div>
        <span className="google-signup-title">Sign in with Google</span>
      </div>
      
      <div className="mt-4 fw-semibold" style={{ fontSize: "1.6rem" }}>
        Don't have an account?&nbsp;
        <Link href="/register">
          <button type="button" style={{ border: "none", background: "transparent", textDecoration: "underline", color: "#1E66CE", fontWeight: "600" }}>
            Register
          </button>
        </Link>
      </div>
    </form>
  </div>
</div>
    </>
  )
}

export default Login