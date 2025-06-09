
//packages
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//types
import { authState, User } from "@/app/types/SliceTypes";

//define state for authslice
export const initialState: authState = {
  user: null,
  isLoading: false,
  error: null,
  isLoggedIn : false
}


//async thunk for logout
export const logout = createAsyncThunk("auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res =  await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
        method : "POST",
        credentials : "include"
      });
      
      //clear localstorage
      localStorage.removeItem("isLoggedIn");

      if(res.ok === true) alert("User logout successfull");
     
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
)


// async thunk to get current user by accessToken
export const getCurrentUser = createAsyncThunk("auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/current-user`, {
         credentials: 'include'
      });
      const data = await res.json();
      
      return data.payload.user;
    } catch (error: any) {
      // localStorage.removeItem("isLoggedIn");
      return rejectWithValue(error.response?.data?.message);
    }
});



//create authSlice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth : (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
    signInStart: (state) => {
      state.isLoading = true;
    },
    signInSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },

  extraReducers(builder) {
    builder
      //handle get current user states
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload as User;
        state.isLoggedIn = true;

      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
         state.isLoggedIn = false;
  
      })
  }


})

export const { signInStart, signInSuccess, signInFailure, resetAuth} = authSlice.actions;

export default authSlice.reducer;
