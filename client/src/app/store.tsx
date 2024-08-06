
import { configureStore } from '@reduxjs/toolkit';

//reducer
import variableReducer from '../features/variableSlice';
import authReducer from '../features/authSlice';


export const store = configureStore({
  reducer: {
    variables : variableReducer,
    auth : authReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch