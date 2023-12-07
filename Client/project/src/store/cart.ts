import { CartStore, Item, cartItemsDemo } from "@/types";
import { create } from "zustand";

const useCartStore = create<CartStore>((set) => ({
  items: <Item[]>cartItemsDemo,
  addItem: (item: Item) =>
    set((state: CartStore) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        // If the item already exists in the cart, check if there is available stock
        if (existingItem.quantity < existingItem.stock) {
          // If there is available stock, increment its quantity by 1
          const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity + 1,
          };
          const updatedItems = state.items.map((i) =>
            i.id === item.id ? updatedItem : i
          );

          return { items: updatedItems };
        } else {
          // If there is no available stock, do not make any changes
          return state;
        }
      } else {
        // If the item doesn't exist in the cart, check if there is available stock
        if (item.stock > 0) {
          // If there is available stock, add it with a quantity of 1
          const newItem = { ...item, quantity: 1 };
          return { items: [...state.items, newItem] };
        } else {
          // If there is no available stock, do not make any changes
          return state;
        }
      }
    }),
  removeItem: (item: Item) =>
    set((state: CartStore) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem && existingItem.quantity > 1) {
        // If the item exists in the cart and its quantity is greater than 1, decrement its quantity by 1
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
        const updatedItems = state.items.map((i) =>
          i.id === item.id ? updatedItem : i
        );
        return { items: updatedItems };
      } else {
        // If the item doesn't exist in the cart or its quantity is 1, remove it from the cart
        const updatedItems = state.items.filter((i) => i.id !== item.id);
        return { items: updatedItems };
      }
    }),

  increaseQuantity: (item: Item) =>
    set((state: CartStore) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem && existingItem.quantity < existingItem.stock) {
        // If the item exists in the cart and there is available stock, increment its quantity by 1
        const updatedItems = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
        return { items: updatedItems };
      } else {
        // If the item doesn't exist in the cart or there is no available stock, do not make any changes
        return state;
      }
    }),
  decreaseQuantity: (item: Item) =>
    set((state: CartStore) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem && existingItem.quantity > 1) {
        // If the item exists in the cart and its quantity is greater than 1, decrement its quantity by 1
        const updatedItems = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
        );
        return { items: updatedItems };
      } else {
        // If the item doesn't exist in the cart or its quantity is 1, remove it from the cart
        const updatedItems = state.items.filter((i) => i.id !== item.id);
        return { items: updatedItems };
      }
    }),
}));

export default useCartStore;
