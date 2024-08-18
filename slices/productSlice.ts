import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type IProductResponse, type IProductState } from "@/type";

const initialState: IProductState = {
  items: {
    products: [],
    brands: [],
    NUMBER_OF_BRANDS: 0,
    NUMBER_OF_PRODUCTS: 0,
  },
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk<IProductResponse>(
  "products/fetchProducts",
  async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default productSlice.reducer;
