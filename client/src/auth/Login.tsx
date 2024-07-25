
import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

//icons
import {FaRegEye , FaFacebook, FaRegEyeSlash} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";




import { CloseModalFun, ShowModalFun } from '../features/variable';
import { useDispatch , useSelector} from 'react-redux';
import { RootState } from '../store';

//css
import "../css/Login.css";
import axios from 'axios';


const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  
     
    const dispatch = useDispatch();
    const show = useSelector((state:RootState)=>state.variables.show);
  

    const handleShow = () => dispatch(ShowModalFun());
    const handleClose = () => dispatch(CloseModalFun());


    const handleLogin = async(e:FormEvent) => {
        e.preventDefault();
       try {
        const res = await axios.post("http://localhost:4000/api/auth/login",{email,password});
        console.log(res);
        if(res.data.success){
          alert('user login successful');
        }
       } catch (error:any) {
        console.log(error.message);
        
       }
    }

    const click = true;

  return (
    <>
<Link to={``} onClick={handleShow} className="user">
          <span>
          <FontAwesomeIcon icon={faUser} style={{ fontSize: "1.7rem", color: "#000" }} />
        </span>
      </Link>

  
 <Modal show={show} onHide={handleClose} centered >
        <Modal.Header closeButton>
          <Modal.Title>unishop</Modal.Title>
        </Modal.Header>
        <form id="login-form" onSubmit={handleLogin} >
              <h2 className="mt-1">Login</h2>
              <p className="mb-3">Login with your email and password</p>
              <div className="mb-3">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  className="input-field"
                  onChange={(e)=>setEmail(e.target.value)}
                  id="exampleInputEmail1"
                  placeholder="Enter your email"
                  autoComplete="none"
                  required
                />
              </div>
              <div className="password">
                <label htmlFor="">Password</label>
                <input
                  type='password'
                  className="input-field"
                  onChange={(e)=>setPassword(e.target.value)}
                  id="exampleInputPassword1"
                  placeholder="Enter your password"
                  autoComplete="none"
                  required
                />
                <button
                  type="button"
                  className="hide-show-password"
                >
                  {" "}
                  {click ? (
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

              <button type="submit" className="sign-in-btn">
                Login
              </button>

              <div className="facebook-signin-option">
                        <div className="facebook-signin-icon">
                            <FaFacebook className="facebook-icon" />
                        </div>
                        <span>Sign in with Facebook</span>
                    </div>

                    <div className="google-signin-option">
                        <div className="google-signin-icon">
                            <FcGoogle className="google-icon" />
                        </div>
                        <span className="google-signup-title">Sign in with Google</span>
                    </div>
                    
              <p className="mt-4" style={{fontFamily:"Kanit, sans-serif"}}>
                not have a account ?<Link to="/Register" onClick={handleClose}>Register</Link>
              </p>
            </form>
      </Modal>

    </>
  )
}

export default Login