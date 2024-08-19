import { createSlice } from "@reduxjs/toolkit";

//type
import { stateType } from "../types/SliceTypes";

const initialState : stateType = {
    cart : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!) : [],
    shipping : ""
}

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        AddToCart : (state , action) => {
          let {_id,price,quantity,title,slug,images} = action.payload;
          
          let cartItems; 

          cartItems = {
            _id,
            price,
            quantity,
            title,
            slug,
            images
          }
          state.cart =[...state.cart,cartItems]; 
        },

        DeletToCart : (state , action) => {
          let updateCart;
          updateCart = state.cart.filter((item) => item._id !== action.payload);
          state.cart = updateCart;
        },

        ResetCart : (state) => {
          state.cart = [];
        }
    },

})

export const {AddToCart , DeletToCart , ResetCart} = cartSlice.actions;

export default cartSlice.reducer;