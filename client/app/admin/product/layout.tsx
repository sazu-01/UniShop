"use client";

import React, { useState } from "react";
import { Nav } from "react-bootstrap";

//icons
import { FaCartShopping, FaUser } from "react-icons/fa6";

import "@/css/AdminProductDashbaord.css";

import CreateProduct from "@/app/components/CreateProduct";
import AdminProducts from "@/app/components/AdminProducts";

export default function AdminProductDashbaord() {

  const [activeTab, setActiveTab] = useState("all-product");

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };



  return (
    <div id="admin-product-dashboard">
      <div className="user-dashboard-inner">
        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Sidebar Navigation */}
          <div className="dashboard-sidebar">
            <Nav className="flex-column">
              {[
                { name: "All Product", icon: <FaUser />, key: "all-product" },
                {
                  name: "Create A Product",
                  icon: <FaCartShopping />,
                  key: "create-a-product",
                },
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
            {activeTab === "all-product" && (
              <div className="content-section">
              <h2 className="form-title">Product Management</h2>
              <AdminProducts />
              </div>
            )}

            {activeTab === "create-a-product" && (
              <div className="content-section">
                <CreateProduct />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
