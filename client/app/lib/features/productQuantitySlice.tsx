

import { createSlice } from "@reduxjs/toolkit";
import { productQuantity } from "@/app/types/SliceTypes";
  
const initialState : productQuantity = {
    productQuantity : 1,
}

const productQuantitySlice = createSlice({
 name : "productQuantity",
 initialState,
 reducers : {
   increement : (state) => {
     state.productQuantity  = state.productQuantity + 1;
   },

   decreement : (state ) => {
    state.productQuantity = state.productQuantity - 1;
   },
   resetProductQuantity : (state) => {
    state.productQuantity = 1;
   }
 }
})

export const {increement, decreement, resetProductQuantity} = productQuantitySlice.actions;

export default productQuantitySlice.reducer;