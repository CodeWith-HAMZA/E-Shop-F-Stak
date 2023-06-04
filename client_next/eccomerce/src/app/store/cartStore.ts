"use client";
import { Product } from "@/types/Product";
import { calculateSubtotal } from "@/utilities/calculate";
import { create } from "zustand";
export interface CartItem extends Product {
  quantity: number;
}
interface CartState {
  cartItems: CartItem[];
  subTotal: number;

  addItemToCart: (item: CartItem) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeItemFromCart: (productId: string) => void;

  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  // value: 3,
  // customIncrement: (givenNumber: number) =>
  //   set((state) => ({ value: state.value + givenNumber })),
  // }
  cartItems: <CartItem[]>[],
  subTotal: 0,

  addItemToCart: (item: CartItem) => {
    const { _id, category, name, images, price, quantity, stock } = <CartItem>(
      item
    );

    set((state: CartState) => {
      // ? check if item exists
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem._id === _id
      );

      // *
      if (item.quantity >= item.stock) {
        return { ...state } as CartState;
      }
      console.log(existingItem, "existing item");
      if (existingItem) {
        const updatedItems = state.cartItems.map((item, idx) => {
          if (item._id === _id) {
            item.quantity += quantity;
            return item;
          }
          return item;
        });

        console.log(updatedItems, "updated items");
        return <CartState>{
          cartItems: [...(updatedItems as CartItem[])],
          subTotal: state.subTotal + item.price,
        };
      } else {
        return <CartState>{
          cartItems: [...state.cartItems, item],
          subTotal: state.subTotal + quantity * item.price,
        };
      }
    });
  },

  removeItemFromCart(productId: string) {
    set((state) => {
      const updatedProducts = state.cartItems.filter(
        (item) => item._id !== productId
      );

      return {
        cartItems: updatedProducts,
        subTotal: calculateSubtotal(updatedProducts),
      };
    });
  },
  increaseQuantity: (productId: string) => {
    set((state) => {
      const updatedProducts = state.cartItems.map((item) => {
        if (item._id === productId && item.quantity < item.stock) {
          item.quantity++;
          return item;
        }
        return item;
      });
      return {
        cartItems: updatedProducts,
        subTotal: calculateSubtotal(updatedProducts),
      };
    });
  },
  decreaseQuantity: (productId: string) => {
    set((state) => {
      const updatedProducts = state.cartItems.map((item) => {
        if (item._id === productId && item.quantity > 1) {
          item.quantity--;
          return item;
        }
        return item;
      });

      return {
        cartItems: updatedProducts,
        subTotal: calculateSubtotal(updatedProducts),
      };
    });
  },

  clearCart: () => {
    set({
      cartItems: <CartItem[]>[],
      subTotal: 0,
    });
  },
}));
