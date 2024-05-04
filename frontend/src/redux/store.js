import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slice/category/categorySlice";

export const store = configureStore({
  reducer: {
    category: categorySlice,
  },
});
