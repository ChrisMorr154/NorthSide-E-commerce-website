// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./store/cart/cartReducer";
import customerReducer from "./store/cust/customerReducer";

const store = configureStore({
  reducer: {
    cartStore: cartReducer,
    customer: customerReducer,
  },
});

export default store;
