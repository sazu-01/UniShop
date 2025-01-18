'use client'

import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/app/lib/hook";

import { logout, resetAuth } from "@/app/lib/features/authSlice";

//icons
import {FaCartShopping, FaHeart, FaUser, FaLocationDot, FaMoneyBill} from "react-icons/fa6"
import { FaSave } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";


import "../../../css/UserDashboard.css"
import Image from "next/image";

export default function Dashboard() {

    const dispatch = useAppDispatch();
    const {user} = useAppSelector((state)=>state.auth);


    //
    const handleLogout = async () => {
        try {
         await dispatch(logout()).unwrap();
         dispatch(resetAuth());
         
        } catch (error) {
          console.error('Logout failed:', error);
          dispatch(resetAuth())
        }
        
    }

  return (
    <>
  <div id="user-dashboard">
         <div className="user-dashboard-inner">


            <div className="user-header">
              <div className="left">
               <figure className="m-0">{user && <Image src={user?.image} alt="" /> }</figure>
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
              <div className="orders"><Link href={`/user/orders`}>
              <span className="me-1"><FaCartShopping /></span>
              <span>orders</span>
              </Link></div>

              <div className="wishlist"><Link href={`/user/wishlist`}>
              <span className="me-1"><FaHeart /></span>
              <span>wishlist</span>
              </Link></div>

              <div className="edit-profile"><Link href={`/user/edit-profile`}>
              <span className="me-1"><FaUser  /></span>
              <span>edit profile</span>
              </Link></div>

              <div className="address"><Link href={`/user/address`}>
              <span className="me-1"><FaLocationDot /></span>
              <span>address</span>
              </Link></div>

              <div className="points"><Link href={`/user/points`}>
              <span className="me-1"><GiTwoCoins /></span>
              <span>unishop coins</span>
              </Link></div>

              <div className="transaction"><Link href={`/user/transaction`}>
              <span className="me-1"><FaMoneyBill   /></span>
              <span>transaction list</span>
              </Link></div>

              <div className="buy-later"><Link href={`/user/buy-later`}>
              <span className="me-1"><FaSave /></span>
              <span>Buy Later</span>
              </Link></div>
              
           </div>

         </div>
     </div>
    </>
  )
}

