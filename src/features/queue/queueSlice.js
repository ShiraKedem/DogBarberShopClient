import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentQueue: null,
};

const queuesSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    AddQueueSlice: (state, action) => {
      state.currentQueue = action.payload;
    },
    ListQueuesSlice: (state, action) => {
      state.currentQueue = action.payload;
    },
  
  },
});

export const { AddQueueSlice,ListQueuesSlice } = queuesSlice.actions;
export default queuesSlice.reducer;