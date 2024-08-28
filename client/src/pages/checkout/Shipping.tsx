
import { useEffect } from 'react';

//hook
import { useAppSelector } from '../../app/hook';

//css
import "../../css/Shipping.css";

//component
import TotalPayable from "../../components/TotalPayable";


const Shipping = () => {

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
                  <input className="" type="text" placeholder="Your Name" />
                </div>

                <div className="email-input">
                  <label htmlFor="">Email Address</label>
                  <input className="" type="email" placeholder="Your Email" />
                </div>
              </div>

                {/*number and alternative number input */}
              <div className="d-flex flex-row">
                <div className="number-input">
                  <label htmlFor="">Phone Number</label>
                  <input type="number" placeholder="Your Phone Number" />
                </div>
                <div className="alternative-number-input">
                  <label htmlFor="">Alternative Number</label>
                  <input type="number" placeholder="Your Alternative Number"  />
                </div>
              </div>


             {/*country and area  input*/}
              <div className="d-flex flex-row">
                <div>
                  <div>Country</div>
                  <select name="country" id="">
                    <option value="">America</option>
                    <option value="">Bangladesh</option>
                    <option value="">China</option>
                    <option value="">Denmark</option>
                    <option value="">Egypt</option>
                    <option value="">France</option>
                    <option value="">Germany</option>
                    <option value="">Hungary</option>
                    <option value="">Italy</option>
                  </select>
                </div>


                <div>
                  <div>Area</div>
                  <select name="city" id="">

                    <option value="">Newyork</option>
                    <option value="">Dhaka</option>
                    <option value="">Beijing</option>
                    <option value="">Copenhagen</option>
                    <option value="">Kayro</option>
                    <option value="">Paris</option>
                    <option value="">Berlin</option>
                    <option value="">Budapost</option>
                    <option value="">Roma</option>
                  </select>
                </div>

              </div>
              
              {/*details address textarea*/}
              <div className="d-flex flex-row">

                <div>
                  <div >Address</div>
                  <textarea name="" id=""></textarea>
                </div>
              </div>


            </form>

       
          </div>
        
          {/*shipping form part end */}

  
          {/*total payable*/}
          <TotalPayable subtotal={subtotal}  /> 


        </div>
      </div>

    </>
  )
}

export default Shipping