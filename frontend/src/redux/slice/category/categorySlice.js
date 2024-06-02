import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCategory = createAsyncThunk("category/getAll", async () => {
  const response = await axios.get("http://localhost:8000/api/v1/category/all");
  return response.data;
});

export const fetchCategoryById = createAsyncThunk(
  "category/fetchById",
  async (categoryId) => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/category/${categoryId}`
    );
    console.log(
      response.data.category,
      "responseByID------------------------>"
    );
    return response.data.category;
  }
);

export const addCategory = createAsyncThunk(
  "category/add",
  async (newCategory) => {
    const response = await axios.post(
      "http://localhost:8000/api/v1/category/new",
      newCategory
    );
    return response.data;
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ id, updatedCategory }) => {
    const response = await axios.put(
      `http://localhost:8000/api/v1/category/update/${id}`,
      updatedCategory
    );
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:8000/api/v1/category/delete/${id}`
    );
    return response.data;
  }
);

const initialState = {
  categories: [],
  category: null, // New state variable to store the fetched category
  isError: false,
  isLoading: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const updatedCategory = action.payload;
        const index = state?.categories?.findIndex(
          (category) => category.id === updatedCategory.id
        );

        if (index !== -1) {
          state.categories[index] = updatedCategory;
        }
      })
      // Reducer case for fetching a category by ID
      .addCase(fetchCategoryById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload; // Store the fetched category
      })
      .addCase(fetchCategoryById.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.categories = state?.categories?.filter(
          (category) => category.id !== action.payload.id
        );
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default categorySlice.reducer;
