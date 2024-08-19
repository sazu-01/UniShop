import { useEffect } from 'react';

//hook
import { useAppSelector } from '../../app/hook';
import { Link } from 'react-router-dom';

//component
import CartItem from "../../components/CartItem";

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


        {/*checkout and promo section*/}
        <div id="checkout-promo-content">
         
         {/*subtotal display*/}
          <div className="subtotal">
            <div>subtotal</div>
            <div>{subtotal}</div>
          </div>

          <div className="dotline"></div>

          {/*additioal note section */}
          <div className="note-title">
            <p>Additioal Note:</p>
            <textarea name="" id=""></textarea>
          </div>


          <div className="dotline"></div>

          {/*promo code input section*/}
          <div className="promocode">
            <div className="">
              <input className="promocode-input" type="text" 
               placeholder="enter promocode" />
            </div>
          </div>
           
           {/*submit promocode buttton */}
          <button className="promocode-btn">Apply Promocode</button>

          <div className="dotline"></div>
          
          {/*link of address page*/}
          <Link to={`/checkout/shipping`} className="select-address-btn">select address</Link>
        </div>
      </div>
    </div>


  )
}

export default Cart

