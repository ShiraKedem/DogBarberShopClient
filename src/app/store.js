import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../features/users/usersSlice"; 
import  queuesSlice from "../features/queue/queueSlice"
const store = configureStore({
  reducer: {
    users: usersSlice,
    queue:queuesSlice
  },
});

export default store;
