"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/app/lib/hook";

import { logout, resetAuth, getCurrentUser } from "@/app/lib/features/authSlice";

import { useRouter } from 'next/navigation';
//icons
import {
  FaCartShopping,
  FaHeart,
  FaUser,
  FaLocationDot,
  FaMoneyBill,
} from "react-icons/fa6";

import Link from "next/link";

import "../../../css/UserDashboard.css";
import Image from "next/image";

import { Nav } from "react-bootstrap";
import { useState } from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import Skeleton from "@/app/components/Skeleton";

export default function Dashboard() {

  const dispatch = useAppDispatch();
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);
  
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("account");

  useEffect(() => {
    // Fetch user data if not already present
    if (!user && isLoggedIn) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, user, isLoggedIn]);

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  //logout function handler
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      dispatch(resetAuth());
      router.replace('/');

    } catch (error) {
      console.error("Logout failed:", error);
      dispatch(resetAuth());
    }
  };

  if(!user) {
    return (
      <ProtectedRoute>
      <div id="user-dashboard">
         <div className="user-dashboard-inner">
           <div className="user-header">
             <div className="left">
              <figure className="m-0">
                 <Skeleton width="10rem" height="10rem" className="rounded"/>
              </figure>
              <div className="name">
              <Skeleton width="10rem" height="2rem" className="" />
              <Skeleton width="8rem" height="2rem" className="mt-3" />
            </div>
             </div>

             <div className="right">
            <Skeleton width="10rem" height="3rem" />
          </div>
           </div>

           <div className="dashboard-content">
            <div className="dashboard-sidebar">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} width="100%" height="3rem" className="mb-4" />
              ))}
            </div>
            <div className="dashboard-main">
              <Skeleton width="100%" height="10rem" className="mb-4" />
              <Skeleton width="100%" height="10rem" className="mb-4" />
            </div>


         </div>
      </div>
      </div>
      </ProtectedRoute>
    )
  }

  return (
    <>

<ProtectedRoute>

<div id="user-dashboard">
      <div className="user-dashboard-inner">
        {/* Header Section */}
        <div className="user-header">
          <div className="left">
            <figure className="m-0">
              {user?.image && (
                <Image src={user.image} width={500} height={500} alt="" />
              )}
            </figure>
            <div className="name">
              <p>Welcome back,</p>
              <p>{user?.name}</p>
            </div>
          </div>
          <div className="right">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Sidebar Navigation */}
          <div className="dashboard-sidebar">
            <Nav className="flex-column">
              {[
                { name: "Account", icon: <FaUser />, key: "account" },
                { name: "Orders", icon: <FaCartShopping />, key: "orders" },
                { name: "Transactions", icon: <FaMoneyBill />, key: "transaction" },
                { name: "Wishlist", icon: <FaHeart />, key: "wishlist" },
                { name: "Addresses", icon: <FaLocationDot />, key: "addresses" },
              ].map((item) => (
                <Nav.Link
                  key={item.key}
                  className={activeTab === item.key ? "active" : ""}
                  onClick={() => handleTabClick(item.key)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span>{item.name}</span>
                </Nav.Link>
              ))}
            </Nav>
          </div>

          {/* Main Content Area */}
          <div className="dashboard-main">
            {activeTab === "account" && (
              <div className="content-section">
                <h3>Account Information</h3>
                <div className="account-info">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={user?.name || ""}
                      readOnly
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={user?.email || ""}
                      readOnly
                    />
                  </div>
                </div>
                <Link href='/admin' style={{color:"#000"}}>Go To Admin Page</Link>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="content-section">
                <h3>Your Orders</h3>
                <div className="empty-state">
                  <p>No orders found</p>
                </div>
              </div>
            )}

            {activeTab === "transaction" && (
              <div className="content-section">
                <h3>Transaction History</h3>
                <div className="empty-state">
                  <p>No transactions found</p>
                </div>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="content-section">
                <h3>Your Wishlist</h3>
                <div className="empty-state">
                  <p>Your wishlist is empty</p>
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="content-section">
                <h3>Saved Addresses</h3>
                <div className="empty-state">
                  <p>No addresses saved</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
    </>
  );
}
