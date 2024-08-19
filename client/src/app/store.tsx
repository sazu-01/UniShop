
import { configureStore } from '@reduxjs/toolkit';

//reducer
import variableReducer from '../features/variableSlice';
import authReducer from '../features/authSlice';
import productReducer from '../features/productSlice';
import CartReducer from "../features/cartSlice";

export const store = configureStore({
  reducer: {
    variables : variableReducer, //reducer to get dynamic variables
    auth : authReducer, //reducer to get user data & tokens
    products : productReducer, //reducer to get products
    cart : CartReducer, //reducer to add or delete from cart
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch