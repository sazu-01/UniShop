

import { Link } from "react-router-dom";
import { useAppSelector , useAppDispatch } from "../../app/hook";
import { logout } from "../../features/authSlice";

//icons
import {FaCartShopping, FaHeart, FaUser, FaLocationDot, FaMoneyBill} from "react-icons/fa6"
import { FaSave } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";


import "../../css/UserDashboard.css";

const UserDashboard = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector((state)=>state.auth);


    //
    const handleLogout = () => {
        dispatch(logout());
        
    }

  return (
    <>
  <div id="user-dashboard">
         <div className="user-dashboard-inner">


            <div className="user-header">
              <div className="left">
               <figure className="m-0">{user && <img src={user?.image} />}</figure>
              <div className="name">
                  <p>Hello</p>
                  <p>{user?.name}</p>
              </div>
              </div>
              <div className="right">
                <button onClick={handleLogout}>Logout</button>
              </div>
            
            </div>

           <div className="user-menus">
              <div className="orders"><Link to={`/user/orders`}>
              <span className="me-1"><FaCartShopping /></span>
              <span>orders</span>
              </Link></div>

              <div className="wishlist"><Link to={`/user/wishlist`}>
              <span className="me-1"><FaHeart /></span>
              <span>wishlist</span>
              </Link></div>

              <div className="edit-profile"><Link to={`/user/edit-profile`}>
              <span className="me-1"><FaUser  /></span>
              <span>edit profile</span>
              </Link></div>

              <div className="address"><Link to={`/user/address`}>
              <span className="me-1"><FaLocationDot /></span>
              <span>address</span>
              </Link></div>

              <div className="points"><Link to={`/user/points`}>
              <span className="me-1"><GiTwoCoins /></span>
              <span>unishop coins</span>
              </Link></div>

              <div className="transaction"><Link to={`/user/transaction`}>
              <span className="me-1"><FaMoneyBill   /></span>
              <span>transaction list</span>
              </Link></div>

              <div className="buy-later"><Link to={`/user/buy-later`}>
              <span className="me-1"><FaSave /></span>
              <span>Buy Later</span>
              </Link></div>
              
           </div>

         </div>
     </div>
    </>
  )
}

export default UserDashboard