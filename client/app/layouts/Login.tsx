
"use client";
//packages
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { Modal } from 'react-bootstrap';

//icons
import { FaRegEye, FaFacebook, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

//redux actions
import { CloseModalFun, ShowModalFun } from '@/app/lib/features/variableSlice';


import { signInStart,  signInSuccess, signInFailure, } from "@/app/lib/features/authSlice"
//import custom hooks
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
  //get modal visibility state from variableSlice
  const show = useAppSelector((state) => state.variables.show);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  
  //modal toggles function
  const handleShow = () => dispatch(ShowModalFun());
  const handleClose = () => dispatch(CloseModalFun());
   
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

    } catch (error) {
      dispatch(signInFailure(error));
    }
  }


  return (
    <>
     {/*user icon to open login modal*/}
      <button onClick={handleShow} className="user">
        <span>
          <FontAwesomeIcon icon={faUser} style={{ fontSize: "1.7rem", color: "#000" }} />
        </span>
      </button>

      {/*login modal*/}
      <Modal show={show} onHide={handleClose} centered >
        <Modal.Header closeButton>
          <Modal.Title>unishop</Modal.Title>
        </Modal.Header>
        <form id="login-form" onSubmit={handleLogin} >
          <h2 className="mt-1">Login</h2>
          <p className="mb-3">Login with your email and password</p>

          {/*email input field*/}
          <div className="mb-3">
            <label htmlFor="">Email</label>
            <input
              type="email"
              className="input-field"
              onChange={handleChange}
              id="email"
              placeholder="Enter your email"
              autoComplete="none"
              required
            />
          </div>

          {/*password input field with show/hide functionality*/}
          <div className="password">
            <label htmlFor="">Password</label>
            <input
              type={seePassword ? `text` : `password`}
              className="input-field"
              onChange={handleChange}
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
              {" "}
              {seePassword ? (
                <FaRegEye type="checkbox" className="see" />
              ) : (
                <FaRegEyeSlash className="dont-see" />
              )}{" "}
            </button>
          </div>
          <p
            className="forgot-password"
            onClick={() => alert("Forget password function will be update")}
          >
            Forgot Password
          </p>
          
          {/*login button*/}
          <button type="submit" className="sign-in-btn">
          {isLoading ? "Logging in..." : "Login"}
          </button>
 
         {/*facebook sign in option */}
          <div className="facebook-signin-option">
            <div className="facebook-signin-icon">
              <FaFacebook className="facebook-icon" />
            </div>
            <span>Sign in with Facebook</span>
          </div>
          
          {/*google sign in option*/}
          <div className="google-signin-option">
            <div className="google-signin-icon">
              <FcGoogle className="google-icon" />
            </div>
            <span className="google-signup-title">Sign in with Google</span>
          </div>
          
          {/*link to register page*/}
          <div className="mt-4 fw-semibold" style={{fontSize:"1.6rem"}}>
              have an account?&nbsp;
              <Link href="/register">
                <button type="button" style={{border : "none", background:"transparent", textDecoration:"underline", color:"#1E66CE", fontWeight:"600"}}
                 onClick={()=>dispatch(CloseModalFun())}
                >
                  Register
                </button>
              </Link>
            </div>
        </form>
      </Modal>

    </>
  )
}

export default Login