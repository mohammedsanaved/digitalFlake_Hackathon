import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addProduct = createAsyncThunk(
  "product/Add",
  async (newProduct, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/product/new",
        newProduct
      );
      // Refresh the products list after adding
      await dispatch(getAllProducts({ page: 1, limit: 10 }));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add product"
      );
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "product/GetAll",
  async ({ page, limit }) => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/product/all?page=${page}&limit=${limit}`
    );
    return response.data;
  }
);

export const getProductById = createAsyncThunk(
  "product/GetById",
  async (id) => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/product/${id}`
    );
    console.log(`response.data.product`, response.data.product);
    return response.data.product;
  }
);

export const updateProduct = createAsyncThunk(
  "product/Update",
  async ({ id, updatedProduct }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/product/update/${id}`,
        updatedProduct
      );
      return response.data.product;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to update product"
      );
    }
  }
);

const initialState = {
  products: [],
  isError: false,
  isLoading: false,
  errorMessage: null,
  pagination: {
    currentPage: 1,
    totalPages: 0,
    total: 0,
  },
  product: null,
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearCurrentProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message || "Failed to add product";
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.products = action.payload.products;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total,
        };
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message || "Failed to fetch products";
      })
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message || "Failed to fetch product";
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const updatedProduct = action.payload;
        const index = state.products.findIndex(
          (product) => product._id === updatedProduct._id
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message || "Failed to update product";
      });
  },
});

export const { clearCurrentProduct } = ProductSlice.actions;

export default ProductSlice.reducer;
