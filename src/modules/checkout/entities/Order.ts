export type ShippingInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
};

export type PaymentInfo = {
  method: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
};

export type OrderItem = {
  productId: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  discountPercentage?: number;
};

export type Order = {
  id: string;
  items: OrderItem[];
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  createdAt: string;
  status: "pending" | "processing" | "completed" | "cancelled";
};
