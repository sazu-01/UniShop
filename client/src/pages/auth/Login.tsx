//packages
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

//icons
import { FaRegEye, FaFacebook, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

//redux actions
import { CloseModalFun, ShowModalFun } from '../../features/variableSlice';
// import { login } from '../features/authSlice';
import { login } from '../../features/authSlice';

//import custom hooks
import { useAppDispatch , useAppSelector} from '../../app/hook';

//css
import "../../css/Login.css"



const Login = () => {

  //state for form input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //state for password visibility
  const [seePassword, setSeepasswrod] = useState(false);

  const dispatch = useAppDispatch();

  //get modal visibility state from variableSlice
  const show = useAppSelector((state) => state.variables.show);
  
  //modal toggles function
  const handleShow = () => dispatch(ShowModalFun());
  const handleClose = () => dispatch(CloseModalFun());

  //handle form submission
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(login({ email, password }));
      if(login.fulfilled.match(resultAction)){
        window.location.reload();
      }else if (login.rejected.match(resultAction)) {
        console.log(resultAction.payload);      }
    } catch (error:any) {
      console.log(error.message);
      
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
              onChange={(e) => setEmail(e.target.value)}
              id="exampleInputEmail1"
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
              onChange={(e) => setPassword(e.target.value)}
              id="exampleInputPassword1"
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
            Login
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
          <p className="mt-4" style={{ fontFamily: "Kanit, sans-serif" }}>
            not have a account ?<Link to="/Register" onClick={handleClose}>Register</Link>
          </p>
        </form>
      </Modal>

    </>
  )
}

export default Login