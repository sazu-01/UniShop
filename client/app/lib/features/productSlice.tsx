
//packages
import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";

//types
import { Products, ProductType } from "@/app/types/SliceTypes";

const initialState : Products = {
   isLoading : false,
   products : null,
   error : null
}

//async thunk to get products
export const getProduct = createAsyncThunk("products/getproduct",
    async() =>{
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/all-product`);
                const data = await res.json();
                
            return data.payload.products;
        } catch (error:any) {
             console.log(error.response?.data?.message);
             throw error
        }
    }
);

//create product slice
const productSlice = createSlice({
    name : "products",
    initialState,
    reducers : {},
    extraReducers(builder) {
      builder
       .addCase(getProduct.pending,(state)=>{
         state.isLoading = true;
       })
       .addCase(getProduct.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.products = action.payload as ProductType[];
      })

      .addCase(getProduct.rejected,(state,action)=>{
        state.isLoading = false;
        state.products = null;
        state.error = action.payload as string;
      })

    }
  
})

export default productSlice.reducer; 