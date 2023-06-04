// export interface Product {
//   readonly id: string;
//   readonly title: string;
//   readonly description: string;
//   readonly imageUrls: { url: string[] };
//   readonly category: string;
//   stock: number;
//   price: number;
// }

interface Image {
  publicId: string;
  url: string;
  _id?: string;
}
export interface Product {
  readonly _id: string;
  readonly name: string;
  readonly description: string;
  price: number;
  ratings: number;
  readonly images: Image[];
  category: string;
  stock: number;
  totalReviews?: number;
  reviews?: any[]; // You can replace 'any' with a specific type for the reviews if available
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductQueryFilters {
  readonly name?: string;
  readonly category?: string;
  readonly minPrice?: number;
  readonly maxPrice?: number;
}
