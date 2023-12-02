export type Item = {
  id: number;
  name: string;
  image: string;
  stock: number;
  quantity: number;
};
export interface CartStore {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (item: Item) => void;
  increaseQuantity: (item: Item) => void;
  decreaseQuantity: (item: Item) => void;
}
