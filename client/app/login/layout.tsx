
"use client";

//packages
import { FormEvent, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

//icons
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

// action slice 
import { signInStart, signInSuccess, signInFailure, } from "@/app/lib/features/authSlice";

//custom hooks
import { useAppDispatch, useAppSelector } from '@/app/lib/hook';

//css
import "@/css/Login.css";


const Login = () => {

  const [redirect, setRedirect] = useState("/");
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter()

  // Ensure component is mounted before accessing browser APIs
  useEffect(() => {
    setMounted(true);

    const params = new URLSearchParams(window.location.search);
    const param = params.get("redirect");
    if (param) {
      setRedirect(param);
    }
  }, []);


  //state
  const [seePassword, setSeePassword] = useState(false);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  //handle form submission
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    console.log(typeof formData.emailOrPhone);
    try {
      dispatch(signInStart());

      // Determine if it's an email or phone
      const payload: any = {
        password: formData.password,
      };

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(formData.emailOrPhone)) {
        payload.email = formData.emailOrPhone;
      } else {
        payload.phone = formData.emailOrPhone;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok === false) {
        dispatch(signInFailure(data));
        alert(data.message)
        return;
      }
      dispatch(signInSuccess(data));
      // Check if localStorage is available before using it
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem("isLoggedIn", "true");
      }

      router.push(redirect);

    } catch (error : any) {
      dispatch(signInFailure(error));
      alert(error.message)
    }
  }


  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div id="login">
        <div className="login-content">
          <div className="login-form">
            <h2 className="login-title">Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>


      <div id="login">
        <div className="login-content">
          <form onSubmit={handleLogin} className="login-form">
            <h2 className="login-title">Login</h2>
            <p className="login-subtitle">Login with your email and password</p>

            <div className="form-group">
              <label htmlFor="emailOrPhone">Email or Phone</label>
              <input
                type="text"
                onChange={handleChange}
                className="input-field"
                id="emailOrPhone"
                placeholder="Enter your email or phone"
                autoComplete="off"
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
                onClick={() => setSeePassword(!seePassword)}
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
            {/*
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
          */}
            <div className="mt-2 fw-semibold" style={{ fontSize: "1.6rem" }}>
              {"Don't have an account? "}
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