interface OrderItem {
  readonly productId: string;
  readonly price: number;
  quantity: number;
}

interface OrderItems {
  items: OrderItem[];
}

export interface Order extends OrderItems {
  readonly id: string;
  customer: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
