
// 'use client'
// import { useEffect } from 'react';

// //hook
// import { useAppSelector } from '@/app/lib/hook';

// //component
// import CartItem from '@/app/components/CartItem';
// import TotalPayable from '@/app/components/TotalPayable';

// //css
// import "@/css/Cart.css"

// const Cart = () => {

//   //extract cart state from redux store  
//   const { cart } = useAppSelector((state) => state.cart);

  
//   //save cart to localstorage whenever its change
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem("cart", JSON.stringify(cart));
//     }
//   }, [cart]);


//   let subtotal: number = 0;

//   //calculate the subtotal price of the order
//   cart.forEach((c) => {
//     subtotal += c.price * c.quantity;
//   })

  
//   return (
//     <div className="cart-page">
//       <div className="cart-page-inner">

//         {/*cart section*/}
//         <div id="cart-content">
//           {cart.map((item, index) => {
//             return <CartItem key={index} product={item} />
//           })}
//         </div>
         
//          {/*payable section*/}
//         <TotalPayable subtotal={subtotal} />
//       </div>
//     </div>


//   )
// }

// export default Cart






'use client';
import { useEffect } from 'react';

//hook
import { useAppSelector } from '@/app/lib/hook';

//component
import CartItem from '@/app/components/CartItem';
import TotalPayable from '@/app/components/TotalPayable';
import { useAppDispatch } from '@/app/lib/hook';
//css
import "../../../css/Cart.css";

import { setCart } from '@/app/lib/features/cartSlice';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        dispatch(setCart(JSON.parse(storedCart)));
      }
    }
  }, [dispatch]);



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
