
import { configureStore } from '@reduxjs/toolkit';

//reducer
import variableReducer from '../features/variableSlice';
import authReducer from '../features/authSlice';
import productReducer from '../features/productSlice';


export const store = configureStore({
  reducer: {
    variables : variableReducer, //reducer to get dynamic variables
    auth : authReducer, //reducer to get user data & tokens
    products : productReducer, //reducer to get products
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch