import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCategory = createAsyncThunk("user/allCategory", () => {
  return axios
    .get("http://localhost:8000/api/v1/category/all")
    .then((res) => res.data);
});
export const addCategory = createAsyncThunk("user/addCategory", () => {
  return axios
    .post("http://localhost:8000/api/v1/category/new")
    .then((res) => res.data);
});
export const updateCategory = createAsyncThunk("user/updateCategory", (id) => {
  return axios
    .put(`http://localhost:8000/api/v1/category/update/${id}`)
    .then((res) => res.data);
});
export const deleteCategory = createAsyncThunk("user/deleteCategory", (id) => {
  return axios
    .delete(`http://localhost:8000/api/v1/category/delete/${id}`)
    .then((res) => res.data);
});
const initialState = {
  categories: [],
  isError: false,
  isLoading: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.isError = false),
        (state.categories = action.payload);
    });
    builder.addCase(getAllCategory.rejected, (state, action) => {
      state.isError = action.error.message;
      state.categories = [];
      state.isLoading = false;
    });
    builder.addCase(addCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.categories.push(action.payload);
      // You can update state with the newly added category if needed
    });
    builder.addCase(addCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message;
    });
  },
});
export default categorySlice.reducer;
