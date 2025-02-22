
'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NotFound from '../not-found';

import "@/css/Admin.css"
import { useAppSelector } from '../lib/hook';

const menuItems = [
  { title: 'Products', image: '/product.webp', href: '/admin/product' },
  { title: 'Marketing', image: '/marketing.webp', href: '/admin/marketing' },
  { title: 'Users', image: '/user.png', href: '/admin/users'},
  { title: 'Orders', image: '/order.jpeg', href: '/admin/orders'},
  { title: 'Delivery', image: '/courier.webp', href: '/admin/delivery'},
  {title : "Change Images of Website", image: '/media.png', href: '/admin/media'},
  {title : "Change Content of Website", image: '/content.webp', href : '/admin/content'}
];

export default function Admin() {
  
  const { user } = useAppSelector((state)=> state.auth);

  if(!user?.isAdmin){
    return <NotFound />
  }

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