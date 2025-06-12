

"use client";

import "@/css/Payment.css";
import Image from "next/image";

type PaymentProps = {
  selected : "cod" | "bkash" | null;
  onPaymentSelect : (method: "cod" | "bkash" | null) => void;
}

const Payment = ({ selected, onPaymentSelect }: PaymentProps) => {


  const handleSelect = (key: string) => {
    if (key === "cod") {
      onPaymentSelect(selected === "cod" ? null : "cod");
    }else if (key === "bkash") {
       onPaymentSelect(selected === "bkash" ? null : "bkash");
    } 
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
          <div className={`payment-option  ${selected === "bkash" ? "selected" : ""}`}>
            <div className="payment-header" onClick={() => handleSelect("bkash")}>
              <div className="payment-selector">
                <input
                  type="checkbox"
                  checked={selected === "bkash"}
                  readOnly
                  className="payment-checkbox"
                />
                <Image src="/bkash.png" alt="" width={25} height={25} />
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




