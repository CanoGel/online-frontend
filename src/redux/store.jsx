import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice'; // adjust if your slice is elsewhere

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // add other reducers here
  },
});

export default store;