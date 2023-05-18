export interface Product {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly imageUrls: string[];
  readonly category: string;
  stock: number;
  price: number;
}
