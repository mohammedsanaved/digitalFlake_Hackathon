import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slice/category/categorySlice";
import productSlice from "./slice/product/productSlice";

export const store = configureStore({
  reducer: {
    category: categorySlice,
    product: productSlice,
  },
});
