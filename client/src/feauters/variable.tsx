import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
    show : any,
}

const initialState: CounterState = {
    show : false,
}

export const counterSlice = createSlice({
  name : 'variables',
  initialState,
  reducers : {
    ShowModalFun : (state:any) =>{
        state.show = true
    },
    CloseModalFun : (state:any) => {
        state.show = false
    }
}
})

// Action creators are generated for each case reducer function
export const { ShowModalFun, CloseModalFun } = counterSlice.actions

export default counterSlice.reducer