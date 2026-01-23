import type { Order, ShippingInfo, PaymentInfo } from "../entities/Order";

export interface CheckoutRepository {
  createOrder: (
    items: Order["items"],
    shippingInfo: ShippingInfo,
    paymentInfo: PaymentInfo,
    totals: {
      subtotal: number;
      tax: number;
      shipping: number;
      total: number;
    }
  ) => Promise<Order>;
  getOrder: (orderId: string) => Promise<Order | null>;
  getAllOrders: () => Promise<Order[]>;
}
