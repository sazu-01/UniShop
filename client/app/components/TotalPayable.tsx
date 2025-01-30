"use client";
//packages
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent } from "react";
//css
import "../../css/TotalPayable.css";

// Create a type for the TotalPayable props
type TotalPayableProps = {
  subtotal: number;
  onConfirmOrder: (e: FormEvent) => Promise<void>;
};

const TotalPayable: React.FC<TotalPayableProps> = ({
  subtotal,
  onConfirmOrder,
}) => {
  const shipping = 50;

  const pathname = usePathname();

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
            <input
              className="promocode-input"
              type="text"
              placeholder="enter promocode"
            />
          </div>
        </div>

        {/*submit promocode buttton */}
        <button className="promocode-btn">Apply Promocode</button>

        {pathname === "/checkout/cart" ? (
          <Link href={`/checkout/shipping`} className="selcet-address-btn">
            Select Address
          </Link>
        ) : (
          <button
            onClick={onConfirmOrder}
            className="confirm-order-btn"
          >
            Confirm Order
          </button>
        )}
      </div>
    </>
  );
};

export default TotalPayable;
