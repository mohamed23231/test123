import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    // Other reducers...
  },
});

export default store;
