
import { configureStore } from '@reduxjs/toolkit'
import productReducer from './features/productSlice';
import cartReducer from './features/cartSlice';
import quantityRducer from './features/productQuantitySlice';
import authReducer from './features/authSlice';
import varaibleReducer from './features/variableSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth : authReducer,
      products: productReducer,
      cart: cartReducer,
      productQuantity: quantityRducer,
      variables: varaibleReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']