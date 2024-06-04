import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addProduct = createAsyncThunk(
  "product/Add",
  async (newProduct) => {
    const response = await axios.post(
      "http://localhost:8000/api/v1/product/new",
      newProduct
    );
    return response.data;
  }
);

const initialState = {
  products: [],
  isError: false,
  isLoading: false,
};
const ProductSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.categories.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        // state.products = action.payload;
      });
  },
});

export default ProductSlice.reducer;
