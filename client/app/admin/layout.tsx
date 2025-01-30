
'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import "@/css/Admin.css"

const menuItems = [
  { title: 'Products', image: '/product.webp', href: '/admin/product' },
  { title: 'Marketing', image: '/marketing.webp', href: '/' },
  { title: 'Users', image: '/user.png', href: '/' },
  { title: 'Orders', image: '/order.jpeg', href: '/' },
  { title: 'Delivery', image: '/courier.webp', href: '/' }
];

export default function layout() {
  return (
    <div className='admin'>
      <h1>Admin Dashboard</h1>
      <div className='admin-inner-content'>
        <div className="admin-grid">
          {menuItems.map((item, index) => (
            <Link href={item.href} key={index} className="admin-card">
              <div className="card-content">
                <div className="image-wrapper">
                  <Image src={item.image} alt={item.title} width={150} height={150} />
                </div>
                <h2>{item.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div> 

    </div>
  );
}