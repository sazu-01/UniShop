
'use client';

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
    subtotal += c.price * c.quantity;
  });

 
  

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
            <TotalPayable subtotal={subtotal} />
          </div>
        </div>
      );
};

export default Cart;
