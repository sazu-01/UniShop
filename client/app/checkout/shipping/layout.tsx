"use client";

import { FormEvent, useState } from "react";
import { ResetCart } from "@/app/lib/features/cartSlice";
import { useAppDispatch } from "@/app/lib/hook";
//hook
import { useAppSelector } from "@/app/lib/hook";

//css
import "../../../css/Shipping.css";

//component
import TotalPayable from "@/app/components/TotalPayable";
import Payment from "@/app/components/Payment";
import { Locations } from "@/app/components/Location";

// Create a type for the form data
type ShippingFormData = {
  name: string;
  email: string;
  number: string;
  alternative_number: string;
  city: string;
  area: string;
  details_address: string;
  delivery_charge: number;
  paymentMethod: "cod" | "bkash" | null;
};

const Shipping = () => {
  //extract cart state from redux store
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  // Combined form state
  const [formData, setFormData] = useState<ShippingFormData>({
    name: "",
    email: "",
    number: "",
    alternative_number: "",
    city: "",
    area: "",
    details_address: "",
    delivery_charge: 0,
    paymentMethod: null
  });



  // Update form data
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  let subtotal: number = 0;

  //calculate the subtotal salePrie of the order
  cart.forEach((c: any) => {
    subtotal += c.salePrice * c.productQuantity;
  });


  // Handle payment method selection
  const handlePaymentSelect = (method: "cod" | "bkash" | null) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: method,
    }));
  };

  // Handle order confirmation
  const handleConfirmOrder = async (e: FormEvent) => {
    e.preventDefault();
    if(cart.length < 1) return alert('please select product first')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order/create-order`, {
        method: "POST",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart,
          ...formData,
        })
      });

      const data = await res.json();

      if (data.success) {
        dispatch(ResetCart());
        setFormData({
          name: "",
          email: "",
          number: "",
          alternative_number: "",
          city: "",
          area: "",
          details_address: "",
          delivery_charge: 0,
          paymentMethod: null
        })
        alert("Order placed successfully, we will contact with you as soon as possible");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <>
      <div className="shipping-page">
        <div className="shipping-page-inner">


          {/*shipping form part start */}
          <div className="shipping-address">
            <form action="" id="shipping-form" onSubmit={handleConfirmOrder}>
              <div className="shipping-title">
                <h2>Shipping Address</h2>
              </div>

              {/*name and email input*/}
              <div className="d-flex flex-row">
                <div className="name-input">
                  <label htmlFor="">Full Name</label>
                  <input
                    className=""
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="email-input">
                  <label htmlFor="">Email Address</label>
                  <input
                    className=""
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/*number and alternative number input */}
              <div className="d-flex flex-row">
                <div className="number-input">
                  <label htmlFor="">Phone Number</label>
                  <input
                    type="number"
                    name="number"
                    placeholder="Your Phone Number"
                    value={formData.number}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="alternative-number-input">
                  <label htmlFor="">Alternative Number</label>
                  <input
                    type="number"
                    name="alternative_number"
                    placeholder="Your Alternative Number"
                    value={formData.alternative_number}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/*country and area  input*/}
              <div className="d-flex flex-row">
                <div>
                  <label>City</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={(e) => {
                      const selectedCity = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        city: selectedCity,
                        area: "",
                        delivery_charge: selectedCity === "ঢাকা" ? 70 : 120,
                      }));
                    }}

                  >
                    <option value="">Select City</option>
                    {Object.keys(Locations).map((cityName) => (
                      <option key={cityName} value={cityName}>
                        {cityName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Area</label>
                  <select
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Area</option>
                    {formData.city &&
                      Locations[formData.city as keyof typeof Locations]?.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}

                  </select>
                </div>
              </div>

              {/*details address textarea*/}
              <div className="d-flex flex-row">
                <div>
                  <div>Address</div>
                  <textarea
                    name="details_address"
                    id=""
                    value={formData.details_address}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
              </div>
              <Payment
                selected={formData.paymentMethod}
                onPaymentSelect={handlePaymentSelect}
              />

              <button
                type="submit"
                className="confirm-order-btn"
              >
                Confirm Order
              </button>
            </form>
          </div>

          {/*shipping form part end */}

          {/*total payable*/}
          <TotalPayable
            subtotal={subtotal}
            delivery_charge={formData.delivery_charge}
          />

        </div>


      </div>
    </>
  );
};

export default Shipping;
