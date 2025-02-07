

"use client";

import { useState } from "react";
import "@/css/Payment.css";
import Image from "next/image";

const Payment = () => {

  const [selected, setSelected] = useState<"cod" | "bkash" | "nagad" | "card" | null>(null);

  const handleSelect = (key: string) => {
    if (key === "cod") setSelected("cod");
    else if (key === "card") setSelected((prev) => (prev === "card" ? null : "card"));
    
  };

  return (
    <div className="payment-container">
      <div className="payment-inner">
      <h2 className="payment-title">Select Payment Method</h2>
      
      <div className="payment-methods">

        <div className={`payment-option ${selected === "cod" ? "selected" : ""}`}>
          <div className="payment-header" onClick={() => handleSelect("cod")}>
            <div className="payment-selector">
              <input
                type="checkbox"
                checked={selected === "cod"}
                readOnly
                className="payment-checkbox"
              />
               <Image src="/cod.jpg" alt="" width={25} height={25} /> 
              <span className="payment-label">Cash on Delivery</span>
            </div>
          </div>
        </div>



        <div className={`payment-option  ${selected === "card" ? "selected" : ""}`}>
          <div className="payment-header" onClick={() => handleSelect("card")}>
            <div className="payment-selector">
              <input
                type="checkbox"
                checked={selected === "card"}
                readOnly
                className="payment-checkbox"
              />
              <Image src="/cart.webp" alt="" width={200} height={25} /> 
              <span className="payment-label">Online Payment</span>
            </div>
          </div>


        </div>
      </div>
    </div>

    </div>
  );
};

export default Payment;




