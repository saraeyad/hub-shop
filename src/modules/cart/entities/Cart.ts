export type CartItem = {
  productId: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  discountPercentage?: number;
};

export type Cart = {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
};
