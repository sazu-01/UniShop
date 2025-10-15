
'use client';

import Image from 'next/image';
import Link from 'next/link';
//hook
import { useAppSelector } from '@/app/lib/hook';

//component
import CartItem from '@/app/components/CartItem';
import TotalPayable from '@/app/components/TotalPayable';

//css
import "@/css/Cart.css";


const Cart = () => {

  const { cart } = useAppSelector((state) => state.cart);
 
  
  let subtotal: number = 0;

  //calculate the subtotal price of the order
  cart.forEach((c) => {
    subtotal += c.discountPrice * c.productQuantity;
  });

  const delivery_charge = 0;


  if (cart.length === 0) {
    return (
      <div className='text-center p-5'>
        <Image
        src="/empty-cart.png"
        width={300}
        height={300}
        style={{width: "auto", height: "auto", maxWidth: "300px"}}
        alt="dasd"
          />
      <p>
        <span>No Items Found,</span>
       <Link href={`/`}  className='text-dark me-2 '> Please continue shopping</Link>
       </p>
      </div>

    )
  }

  return (
    <div className="cart-page">
      <div className="cart-page-inner">
        {/*cart section*/}
        <div id="cart-content">
          {cart.map((item, index) => {
            return <CartItem key={index} product={item} />;
          })}
        </div>

        {/*payable section*/}
        <TotalPayable subtotal={subtotal} delivery_charge={delivery_charge} />
      </div>
    </div>
  );
};

export default Cart;
