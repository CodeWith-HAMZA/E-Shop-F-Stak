import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface CartItem {
  [key: string]: string | number;

  readonly id: string;
  readonly title: string;
  readonly imageUrl: string;
  readonly price: number;
  stock: number;
  quantity: number;
}

export interface CartItems {
  items: CartItem[];
}
export interface CartState extends CartItems {
  totalPrice: number;
}

const initialState: CartState = {
  totalPrice: 0,
  items: <CartItem[]>[],
};

export const cartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    // * Reducer for adding an item to the cart
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        // If the item already exists in the cart, update the quantity
        existingItem.quantity++;
      } else {
        // Otherwise, add the new item to the cart
        state.items.push(newItem);
        state.items = [...state.items, newItem];
      }

      //  Update the total price based on the added item
      state.totalPrice += newItem.price * newItem.quantity;
    },

    // * Reducer for removing an item from the cart
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;

      //  returns index-number at where the element was found, or -1
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === itemId
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];

        // Decrease the total price based on the removed item
        state.totalPrice -= existingItem.price * existingItem.quantity;
        // Remove the item from the cart
        state.items.splice(existingItemIndex, 1);
      }
    },

    // * Reducer for increasing the quantity of an item in the cart
    increaseCartItemQuantity: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem) {
        // Check if the quantity is less than the stock limit before increasing it
        if (existingItem.quantity < existingItem.stock) {
          existingItem.quantity++;
          // Increase the total price based on the updated quantity
          state.totalPrice += existingItem.price;
        }
      }
    },

    // * Reducer for decreasing the quantity of an item in the cart
    decreaseCartItemQuantity: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);

      // Check if the quantity is greater than 1 Of The Item before decreasing it
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        state.totalPrice -= existingItem.price;
      }
    },

    // * Reducer for clearing the entire cart
    clearCart: (state) => {
      // Clear the items array
      state.items = [];

      // Reset the total price to 0
      state.totalPrice = 0;
    },
  },
});

// Extract the action creators from the cart slice
export const {
  addItemToCart,
  removeItemFromCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
