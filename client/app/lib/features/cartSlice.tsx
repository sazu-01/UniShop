


'use client';
import { createSlice } from "@reduxjs/toolkit";
import { stateType } from "@/app/types/SliceTypes";

function getInitialCart() {
  if (typeof window === 'undefined') return [];
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch {
    return [];
  }
}

const initialState: stateType = {
  cart: [],
  shipping: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initializeCart: (state) => {
      state.cart = getInitialCart();
    },
    AddToCart: (state, action) => {
      const { _id, price, productQuantity, title, slug, images, quantity } = action.payload;
      const cartItems = {
        _id, price, productQuantity, title, slug, images, quantity
      };
      state.cart = [...state.cart, cartItems];
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    DeletToCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    ResetCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    }
  },
});

export const { initializeCart, AddToCart, DeletToCart, ResetCart } = cartSlice.actions;
export default cartSlice.reducer;