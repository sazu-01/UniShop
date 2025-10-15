"use client";
//packages
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent } from "react";
import { useAppSelector } from "../lib/hook";
//css
import "../../css/TotalPayable.css";

// Create a type for the TotalPayable props
type TotalPayableProps = {
  subtotal: number;
  delivery_charge : number
  onConfirmOrder?: (e: FormEvent) => Promise<void>;
};

const TotalPayable: React.FC<TotalPayableProps> = ({
  subtotal,
  delivery_charge,
}) => {

  const pathname = usePathname();

    const { user } = useAppSelector((state) => state.auth);


  return (
    <>
      <div className="total">
        <div className="subtotal d-flex flex-row justify-content-between">
          <p>Subtotal</p>
          <p>{subtotal}</p>
        </div>
        <div className="shipping d-flex flex-row justify-content-between">
          <p>Shipping</p>
          <p>{delivery_charge}</p>
        </div>
        <div className="discount d-flex flex-row justify-content-between">
          <p>Discount</p>
          <p>-</p>
        </div>
        <div className="dotline"></div>

        <div className=" d-flex flex-row justify-content-between mb-2">
          <p>Total</p>
          <p>TK. {subtotal + delivery_charge}</p>
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

        {pathname === "/checkout/cart" ?
          <Link href={user !== null ? `/checkout/shipping` : `/login?redirect=/checkout/shipping`}  className="selcet-address-btn desktop-only">
            Select Address
          </Link>
        : "" }
      </div>


       {/* Mobile fixed button */}
      {pathname === "/checkout/cart" && (
        <div className="fixed-button-wrapper mobile-only">
          <Link href={user !== null ? `/checkout/shipping` : `/login?redirect=/checkout/shipping`} className="selcet-address-btn-mobile">
            Select Address
          </Link>
        </div> 
      )}
    </>
  );
};

export default TotalPayable;
