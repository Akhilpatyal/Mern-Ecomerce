import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;
const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;

// async thunk to create a checkout session
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchProducts",
  async () => {
    const response = await axios.get(`${API_URL}/api/admin/products`, {
      headers: {
        Authorization: USER_TOKEN,
      },
    });
    return response.data;
  }
);

// async function to create a new product
export const createProduct = createAsyncThunk(
  "adminProducts/createProducts",
  async (productData) => {
    const response = await axios.post(
      `${API_URL}/api/admin/products`,
      productData,
      {
        headers: {
          Authorization: USER_TOKEN,
        },
      }
    );
    return response.data;
  }
);

//   async thunk to update am existing product
export const updateProduct = createAsyncThunk(
  "adminProducts/updateProducts",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${API_URL}/api/admin/products/${id}`,
      productData,
      {
        headers: {
          Authorization: USER_TOKEN,
        },
      }
    );
    return response.data;
  }
);

//   async thunk to delete a product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProducts",
  async ({ id }) => {
    await axios.delete(`${API_URL}/api/admin/products/${id}`, {
      headers: {
        Authorization: USER_TOKEN,
      },
    });
    return id;
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    product: [],

    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //   create products
      .addCase(createProduct.fulfilled, (state, action) => {
        state.product.push(action.payload);
      })

      //   update products
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.product.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.product[index] = action.payload;
        }
      })
      // delete products
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.product = state.product.filter(
          (product) => product._id !== action.payload
        );
      });
  },
});
export default adminProductSlice.reducer;
