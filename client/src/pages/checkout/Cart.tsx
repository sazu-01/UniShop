import { useEffect } from 'react';

//hook
import { useAppSelector } from '../../app/hook';

//component
import CartItem from "../../components/CartItem";
import TotalPayable from '../../components/TotalPayable';

//css
import "../../css/Cart.css"

const Cart = () => {

  //extract cart state from redux store  
  const { cart } = useAppSelector((state) => state.cart);

  //save cart to localstorage whenever its change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  let subtotal: number = 0;

  //calculate the subtotal price of the order
  cart.forEach((c) => {
    subtotal += c.price * c.quantity;
  })


  
  return (
    <div className="cart-page">
      <div className="cart-page-inner">

        {/*cart section*/}
        <div id="cart-content">
          {cart.map((item, index) => {
            return <CartItem key={index} product={item} />
          })}
        </div>
         
         {/*payable section*/}
        <TotalPayable subtotal={subtotal} />
      </div>
    </div>


  )
}

export default Cart

