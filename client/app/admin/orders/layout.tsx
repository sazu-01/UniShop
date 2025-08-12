
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChangeEvent } from 'react';
import Image from 'next/image';
import "@/css/AdminOrderDashbaord.css"

type Cart = {
 _id : string;
 discountPrice : number;
 productQuantity : number;
 title : string;
 slug : string;
 images : string[];
 quantity : string;
 selectedSize : string;
}

 type Order = {
   _id : string;
   cart : Cart[];
   name : string;
   email : string;
   number : string;
   city : string;
   area : string;
   details_address : string;
   delivery_charge : string;
   paymentMethod: string;
   createdAt : string;
}

export default function OrdersLayout() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  const getAllOrder = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order/all-order`, {
        method : "GET",
        credentials : "include"
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.payload.orders);
        setFilteredOrders(data.payload.orders);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllOrder();
  }, []);

  // Handle search
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = orders.filter(order => 
      order.email.toLowerCase().includes(term) || 
      order.number.includes(term)
    );
    setFilteredOrders(filtered);
  };

  return (

<div className="orders-container container-fluid py-4 px-3 px-md-4">
      {/* Search Section */}
      <div className="row g-4 mb-4">
        <div className="col-xl-6 col-lg-8 mx-auto">
          <div className="search-wrapper">
            <i className="bi bi-search search-icon"></i>
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search by email or phone number..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="row g-4">
        {filteredOrders.map((order, index) => (
          <div key={order._id} className="col-12">
            <div className="order-card">
              {/* Order Header */}
              <div className="order-header">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center w-100 gap-2">
                  <h5 className="order-number mb-0">Order #{index + 1}</h5>
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="order-content p-3 p-md-4">
                {/* Products Table */}
                <div className="products-section mb-4">
                  <h6 className="section-title mb-3">Order Items</h6>
                  <div className="table-responsive">
                    <table className="table custom-table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Title</th>
                          <th className="text-end">Price</th>
                          <th className="text-center">Qty</th>
                          <th className="text-end">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.cart.map((item) => (
                          <tr key={item._id}>
                            <td>
                              <div className="product-image-wrapper">
                                <Image
                                  src={item.images[0]}
                                  alt={item.title}
                                  className="product-image img-fluid"
                                  width={100}
                                  height={100}
                                />
                              </div>
                            </td>
                            <td>
                              <Link href={`/product/${item.slug}`} className="product-title-mobile">{item.title}  {item.selectedSize && <span>({item.selectedSize})</span>}</Link>
                            </td>
                            <td className="text-end" style={{fontSize:"1.6rem"}}>TK. {item.discountPrice}</td>
                            <td className="text-end text-center">{item.productQuantity}</td>
                            <td className="text-end fw-bold">TK. {item.discountPrice * item.productQuantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Customer and Shipping Details */}
                <div className="row g-4 mb-4">
                  <div className="col-lg-6">
                    <div className="info-card h-100">
                      <h6 className="info-title">Customer Details</h6>
                      <div className="info-content">
                        <div className="info-item">
                          <i className="bi bi-person"></i>
                          <span className="label">Name:</span>
                          <span className="value">{order.name}</span>
                        </div>
                        <div className="info-item">
                          <i className="bi bi-envelope"></i>
                          <span className="label">Email:</span>
                          <span className="value">{order.email}</span>
                        </div>
                        <div className="info-item">
                          <i className="bi bi-telephone"></i>
                          <span className="label">Phone:</span>
                          <span className="value">{order.number}</span>
                        </div>

                        <div className="info-item">
                          <i className="bi bi-telephone"></i>
                          <span className="label">Payment Method:</span>
                          <span className="value">{order.paymentMethod}</span>
                        </div>

                      </div>
                    </div>
                  </div>
                  
                  <div className="col-lg-6">
                    <div className="info-card h-100">
                      <h6 className="info-title">Shipping Address</h6>
                      <div className="info-content">
                        <div className="info-item">
                          <i className="bi bi-geo-alt"></i>
                          <span className="label">Address:</span>
                          <span className="value">{order.details_address}</span>
                        </div>
                        <div className="info-item">
                          <i className="bi bi-building"></i>
                          <span className="label">Area:</span>
                          <span className="value">{order.area}</span>
                        </div>
                        <div className="info-item">
                          <i className="bi bi-globe"></i>
                          <span className="label">City:</span>
                          <span className="value">{order.city}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="order-summary">
                  <div className="summary-content">
                    <div className="summary-item">
                      <span>Subtotal</span>
                      <span className="amount">
                        TK. {order.cart.reduce((total, item) => total + (item.discountPrice * item.productQuantity), 0)}
                      </span>
                    </div>
                    <div className="summary-item">
                      <span>Delivery Charge</span>
                      <span className="amount">TK. {order.delivery_charge}</span>
                    </div>
                    <div className="summary-total">
                      <span>Total</span>
                      <span className="total-amount">
                        TK. {order.cart.reduce((total, item) => 
                          total + (item.discountPrice * item.productQuantity), 0) + parseInt(order.delivery_charge)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}