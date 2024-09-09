
import { useState } from "react";

import "../../css/Payment.css"

const Payment = () => {

  const [select , setSelected] = useState<any>(null);

  const handleSelect = (key:any) => {
       if(key === "cod") setSelected("cod");
       else if(key === "card") setSelected((prev:any)=> (prev === "card" ? null : "card"));
  }

  return (
    <>
     <div id="accordion">
     <div className="accordion-box ">
       <div className="accordion-header" onClick={()=>setSelected("cod")} >
         <div className="d-flex align-items-center">
           <input type="checkbox" checked={select === "cod"}  readOnly />
          <p>Pay with COD</p></div>
         </div>
       </div>

       <div className="accordion-box ">
         <div className="accordion-header"  onClick={()=>handleSelect("card")} >
           <div className="d-flex align-items-center">
             <input type="checkbox" checked={select === "card"} readOnly />
             <p>Pay with Card</p>
           </div>
         </div>
         <div className={`accordion-body ${select === `card` ? `open` : ``}` } >
           <div className="card-payment-input">
               <input type="text" placeholder="enter card number" />
               <input type="text" placeholder="mm/yy" />
           </div>

           <div className="card-payment-input">
               <input type="text" placeholder="name on card" />
               <input type="text" placeholder="name on card" />
           </div>

         </div>
       </div>
     </div>
    </>
  )
}

export default Payment


