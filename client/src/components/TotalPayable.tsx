
//packages
import React from "react";
import { Link, useLocation } from "react-router-dom";

//css
import "../css/TotalPayable.css";

interface TotalPayableProps {
  subtotal : number;
}

const TotalPayable : React.FC<TotalPayableProps> = ({subtotal}) => {
  
   
    const location = useLocation();

    let shipping = 50;

    
  return (
    <>
           <div className="total">
             <div className="subtotal d-flex flex-row justify-content-between">
               <p>Subtotal</p>
                <p>${subtotal}</p>
             </div>
             <div className="shipping d-flex flex-row justify-content-between">
              <p>Shipping</p>
              <p>${shipping}</p>
             </div>
             <div className="discount d-flex flex-row justify-content-between">
              <p>Discount</p>
              <p>-</p>
             </div>
             <div className="dotline"></div>
             
             <div className=" d-flex flex-row justify-content-between mb-2">
              <p>Total</p>
              <p>${subtotal + shipping}</p>
             </div>

             
          {/*promo code input section*/}
          <div className="promocode">
            <div className="">
              <input className="promocode-input" type="text" 
               placeholder="enter promocode" />
            </div>
          </div>
           
           {/*submit promocode buttton */}
          <button className="promocode-btn">Apply Promocode</button>

      

          {location.pathname === "/checkout/cart" ? <Link to={`/checkout/shipping`} className="selcet-address-btn">Select Address</Link> : 
          
          <Link to={`/checkout/payment`} className="confirm-order-btn">Proceed To Payment</Link>
          } 
          </div>

    </>
  )
}

export default TotalPayable