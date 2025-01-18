// 'use client'

// import { createSlice } from "@reduxjs/toolkit";

// //type
// import { stateType } from "@/app/types/SliceTypes";

// const initialState : stateType = {
//     cart : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!) : [],
//     shipping : ""
// }
 
// const cartSlice = createSlice({
//     name : "cart",
//     initialState,
//     reducers : {
//         AddToCart : (state , action) => {
//           const {_id,price,productQuantity,title,slug,images,quantity} = action.payload;

//          const cartItems = {
//             _id,
//             price,
//             productQuantity,
//             title,
//             slug,
//             images,
//             quantity,
//           }
//           state.cart =[...state.cart,cartItems]; 
//         },

//         DeletToCart : (state , action) => {
//          const updateCart = state.cart.filter((item) => item._id !== action.payload);
//           state.cart = updateCart;
//         },

//         ResetCart : (state) => {
//           state.cart = [];
//         }
//     },

// })

// export const {AddToCart , DeletToCart , ResetCart} = cartSlice.actions;

// export default cartSlice.reducer;













'use client';

import { createSlice } from "@reduxjs/toolkit";

// type
import { stateType } from "@/app/types/SliceTypes";

const initialState: stateType = {
  cart: [], // Avoid accessing localStorage directly here
  shipping: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddToCart: (state, action) => {
      const { _id, price, productQuantity, title, slug, images, quantity } = action.payload;

      const cartItems = {
        _id,
        price,
        productQuantity,
        title,
        slug,
        images,
        quantity,
      };
      state.cart = [...state.cart, cartItems];

      // Update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    DeletToCart: (state, action) => {
      const updateCart = state.cart.filter((item) => item._id !== action.payload);
      state.cart = updateCart;

      // Update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    ResetCart: (state) => {
      state.cart = [];

      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem("cart");
      }
    },

    setCart: (state, action) => {
      // Populate cart from localStorage
      state.cart = action.payload;
    },

  },
});

export const { AddToCart, DeletToCart, ResetCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;
