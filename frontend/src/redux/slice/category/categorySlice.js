import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunks
export const getAllCategory = createAsyncThunk("category/getAll", async () => {
  const response = await axios.get("http://localhost:8000/api/v1/category/all");
  return response.data.categories; // Adjust this if the data structure is different
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
    return response.data.category; // Adjust this if the data structure is different
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ id, updatedCategory }) => {
    const response = await axios.put(
      `http://localhost:8000/api/v1/category/update/${id}`,
      updatedCategory
    );
    // dispatch(getAllCategory())
    return response.data.category; // Adjust this if the data structure is different
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, { dispatch }) => {
    await axios.delete(`http://localhost:8000/api/v1/category/delete/${id}`);
    dispatch(getAllCategory());
    return { id };
  }
);

const initialState = {
  categories: [],
  category: null,
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
        state.isError = false;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(fetchCategoryById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const updatedCategory = action.payload;
        const index = state.categories.findIndex(
          (category) => category.id === updatedCategory.id
        );

        if (index !== -1) {
          state.categories[index] = updatedCategory;
        }
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload.id
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export default categorySlice.reducer;
