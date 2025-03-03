
import { createSlice } from '@reduxjs/toolkit'

//define the state interface for the counter slice
export interface CounterState {
    show : boolean,
}

//set the initial state
const initialState: CounterState = {
    show : false,
}

export const counterSlice = createSlice({
  name : 'variables',
  initialState,
  reducers : {
    //action to show the modal 
    ShowModalFun : (state:any) =>{
        state.show = true
    },
    //action to close the modal
    CloseModalFun : (state:any) => {
        state.show = false
    }
}
})

// Action creators are generated for each case reducer function
export const { ShowModalFun, CloseModalFun } = counterSlice.actions

// Export the reducer
export default counterSlice.reducer