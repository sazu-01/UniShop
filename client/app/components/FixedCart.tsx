import React from 'react';
import Link from 'next/link';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useAppSelector } from '../lib/hook';
import "@/css/FixedCart.css"

const FixedCart = () => {
  const { cart } = useAppSelector((state) => state.cart);
  
  return (
    <>
      <Link href="/checkout/cart" id='fixed-cart'>
        <AiOutlineShoppingCart className="cart-icon" />
        {cart.length !== 0 ? (
          <span className="responsive-cart-length">{cart.length}</span>
        ) : ""}
      </Link>
    </>
  );
};

export default FixedCart;