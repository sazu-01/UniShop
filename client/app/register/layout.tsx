
"use client";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
import "../../css/Register.css";
import { FormEvent, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from 'next/navigation';


const Register = () => {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeepasswrod] = useState(false);

  const handleRegistration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/register-process`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          phone,
          password,
        }),
      });

      const data = await res.json();
      if(!data.success){
         alert(data.message)
         return;
      }
      
      alert(data.message);
      // Clear form after successful registration
      setEmail("");
      setphone("");
      setPassword("");
      router.push('/login')
    } catch (error: any) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <div id="register">

        <div className="register-content">
          <form onSubmit={handleRegistration} className="register-form">
            <h2 className="register-title">Register</h2>
            <p className="register-subtitle">Register with email, number & password</p>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                id="exampleInputEmail1"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPhone">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                className="input-field"
                id="exampleInputPhone"
                placeholder="Enter your Phone"
                required
              />
            </div>
            <div className="form-group" id="password">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type={seePassword ? `text` : `password`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                id="exampleInputPassword1"
                placeholder="Enter your password"
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
            <button type="submit" className="sign-up-btn">
              Create Account
            </button>
            <div className="or">
              <div className="line"></div>
              <div className="text">
                <span>or</span>
              </div>
            </div>
            {/*  <div className="facebook-signin-option"  onClick={()=>alert("This feature not valid yet, please register with gmail")}>
              <div className="facebook-signin-icon">
                <FaFacebook className="facebook-icon" />
              </div>
              <span>Sign in with Facebook</span>
            </div>
          <div className="google-signin-option"  onClick={()=>alert("This Feature not valid yet, please register with gmail")}>
              <div className="google-signin-icon">
                <FcGoogle className="google-icon" />
              </div>
              <span className="google-signup-title">Sign in with Google</span>
            </div> */}
            <div className="mt-4 fw-semibold" style={{ fontSize: "1.6rem" }}>
              have an account?&nbsp;
              <Link href="/login">
                <button type="button" style={{ border: "none", background: "transparent", textDecoration: "underline", color: "#1E66CE", fontWeight: "600" }} >
                  Login
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
