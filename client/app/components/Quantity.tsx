
'use client'

//packages
import { useDispatch } from "react-redux";
import { useEffect } from "react";

//icons
import { FaPlus, FaMinus } from "react-icons/fa6";

//hooks
import { useAppSelector } from "../lib/hook";

//action
import { increement, decreement, resetProductQuantity } from 
"../lib/features/productQuantitySlice";

import '../../css/Quantity.css'

const Quantity = () => {

  const dispatch = useDispatch();

  //get productQuantity of user select 
  const { productQuantity } = useAppSelector((state)=>state.productQuantity);
  
  //dispatch the action whenever reload the page 
  useEffect(()=>{
    dispatch(resetProductQuantity())
  },[dispatch])
  

  return (
    <>
      <div className="quantity-container d-flex justify-content-start">
        <button className="decreement-btn" onClick={()=>dispatch(decreement())} disabled={productQuantity === 1}><FaMinus /></button>
        <span>{productQuantity}</span>
        <button className="increement-btn" onClick={()=>dispatch(increement())}><FaPlus /></button>
      </div>
    </>
  );
};

export default Quantity;
