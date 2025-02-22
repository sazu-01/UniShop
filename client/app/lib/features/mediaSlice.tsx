

import { createSlice } from "@reduxjs/toolkit";


interface MediaState {
  carouselImages: string[];
  logo  : string
}

const initialState: MediaState = {
  carouselImages : [],
  logo : ""
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {

  },
});

export const { } = mediaSlice.actions;
export default mediaSlice.reducer;

