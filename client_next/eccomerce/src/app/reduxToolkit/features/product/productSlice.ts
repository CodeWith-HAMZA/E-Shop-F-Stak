import { Product } from "@/types/Product";
import {
  createSlice,
  createAsyncThunk,
  Action,
  PayloadAction,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import {
  productsApi,
  useGetProductDetailsByIdQuery,
  useGetProductsQuery,
} from "../../services/products";
import { RootState } from "../../store";
import api from "@/services/api";

interface ProductState {
  products: Product[];
  selectedProductDetails: Product | null;
  totalResults: number;
  loading: boolean;
  error: null | undefined | string;
}

// * Definning initial-state Of Product Slice
const initialState: ProductState = {
  products: <Product[]>[],
  selectedProductDetails: null,
  totalResults: 0,
  loading: false,
  error: null,
};

// Define the asynchronous thunk action for fetching products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (queryParams, thunkAPI) => {
    try {
      const { data } = await api.get("http://localhost:5500/api/v1/products");
      console.log(data);

      return data.products;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchSelectedProductDetails = createAsyncThunk(
  "products/fetchSelectedProductDetails",
  async (productId: string, thunkAPI) => {
    try {
      const response = await useGetProductDetailsByIdQuery(productId);

      // return response.data.product;
    } catch (error) {
      throw new Error("Failed to fetch selected product details");
    }
  }
);

// Define the product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    hamza() {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        const products = <Product[]>action.payload;
        state.products = products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSelectedProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSelectedProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        const product = <Product>action.payload;
        state.selectedProductDetails = product;
      })
      .addCase(fetchSelectedProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the actions and reducer
export const {} = productSlice.actions;
export default productSlice.reducer;
