import { create } from "zustand";
interface Cart {
  value: number;
  customIncrement: (givenNumber: number) => void;
}

export const useCartStore = create<Cart>((set) => ({
  value: 3,
  customIncrement: (givenNumber: number) =>
    set((state) => ({ value: state.value + givenNumber })),
}));
