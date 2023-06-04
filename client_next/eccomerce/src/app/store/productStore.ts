import api from "@/services/api";
import { Product, ProductQueryFilters } from "@/types/Product";
import { create } from "zustand";

export interface ProductState {
  products: Product[];
  selectedCurrentProduct: Product;
  totalResults: number;
  getProducts: (queryParams: ProductQueryFilters) => Promise<void>;
  getProductDetails: (productId: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  // value: 3,
  // customIncrement: (givenNumber: number) =>
  //   set((state) => ({ value: state.value + givenNumber })),
  // }
  products: <Product[]>[],
  selectedCurrentProduct: <Product>{},
  totalResults: 0,

  getProducts: async (queryParams: ProductQueryFilters) => {
    try {
      const {
        data: { success, products, totalResults, message },
      } = await api.get(`/products`, {
        params: { ...queryParams },
      });
      if (success) {
        set((state: ProductState) => {
          return {
            ...state,
            products: products,
            totalResults,
          };
        });
      } else {
        console.log(message);
        // show-toast about failing api cause
      }
    } catch (error) {
      console.log(error, "while fetching products");
    }
  },

  getProductDetails: async (productId: string): Promise<void> => {
    try {
      const {
        data: { success, product, message },
      } = await api.get(`/products/${productId}`);
      if (success) {
        set((state: ProductState) => {
          return {
            ...state,
            selectedCurrentProduct: product,
          };
        });
      } else {
        console.log(message);
        // show-toast about failing api cause
      }
    } catch (error) {
      console.log(error, "while fetching single product details");
    }
  },
}));
