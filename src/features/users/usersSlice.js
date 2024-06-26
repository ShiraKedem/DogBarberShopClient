import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUsers: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    Login: (state, action) => {
      state.currentUsers = action.payload;
    },
    Logout: (state) => {
      state.currentUsers = null;
    },
  },
});

export const { Login, Logout } = usersSlice.actions;
export default usersSlice.reducer;
