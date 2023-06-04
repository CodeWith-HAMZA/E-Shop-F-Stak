import { CartItem } from "@/app/store/cartStore";

export const calculateSubtotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce((subTotal, cartItem) => {
    return subTotal + cartItem.quantity * cartItem.price;
  }, 0);
};
