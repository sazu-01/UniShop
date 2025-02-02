"use client";

import { FormEvent, useEffect, useState } from "react";

//hook
import { useAppSelector } from "@/app/lib/hook";

//css
import "../../../css/Shipping.css";

//component
import TotalPayable from "../../components/TotalPayable";

//
import Payment from "@/app/components/Payment";
import { api } from "@/app/utili/axiosConfig";

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
};

const Shipping = () => {
  //extract cart state from redux store
  const { cart } = useAppSelector((state) => state.cart);
  console.log(cart);
  
  // Combined form state
  const [formData, setFormData] = useState<ShippingFormData>({
    name: "",
    email: "",
    number: "",
    alternative_number: "",
    city: "",
    area: "",
    details_address: "",
    delivery_charge: 50,
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


  //save cart to localstorage whenever its change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  let subtotal: number = 0;

  //calculate the subtotal price of the order
  cart.forEach((c) => {
    subtotal += c.price * c.quantity;
  });

  // Handle order confirmation
  const handleConfirmOrder = async (e: FormEvent) => {
    e.preventDefault();
   
    try {
      const res = await api.post("/order/create-order", {
        cart,
        ...formData,
      });

      if (res.data.success) {
       alert("Order placed successfully");
      } else {
        console.log(res.data.message);
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
            <form action="" id="shipping-form">
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
                  <div>Country</div>
                  <select
                    id=""
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  >
                    <option value="America">America</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="China">China</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Egypt">Egypt</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Italy">Italy</option>
                  </select>
                </div>

                <div>
                  <div>Area</div>
                  <select
                    name="area"
                    id=""
                    value={formData.area}
                    onChange={handleInputChange}
                  >
                    <option value="Newyork">Newyork</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Beijing">Beijing</option>
                    <option value="Copenhagen">Copenhagen</option>
                    <option value="Kayro">Kayro</option>
                    <option value="Paris">Paris</option>
                    <option value="Berlin">Berlin</option>
                    <option value="Budapost">Budapost</option>
                    <option value="Roma">Roma</option>
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
                  ></textarea>
                </div>
              </div>
            </form>
          </div>

          {/*shipping form part end */}

          {/*total payable*/}
          <TotalPayable
            subtotal={subtotal}
            onConfirmOrder={handleConfirmOrder}
          />
        </div>

        <Payment />
      </div>
    </>
  );
};

export default Shipping;
