export type Item = {
  id: number;
  name: string;
  image: string;
  stock: number;
  quantity: number;
  price: number;
};

export interface CartStore {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (item: Item) => void;
  increaseQuantity: (item: Item) => void;
  decreaseQuantity: (item: Item) => void;
}

export const cartItemsDemo: Item[] = [
  {
    id: 2,
    name: "tshirt",
    image:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    stock: 23,
    quantity: 3,
    price: 24.3,
  },
  {
    id: 1,
    name: "tshirt2",
    image:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    stock: 7,
    quantity: 3,
    price: 235,
  },
  {
    id: 3,
    name: "334343",
    image:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    stock: 7,
    quantity: 3,
    price: 4.2,
  },
];
