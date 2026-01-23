import type { CheckoutRepository } from "./CheckoutRepository";
import type { Order, ShippingInfo, PaymentInfo } from "../entities/Order";

const ORDERS_STORAGE_KEY = "orders";

const getOrdersFromStorage = (): Order[] => {
  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveOrdersToStorage = (orders: Order[]): void => {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error("Error saving orders to localStorage:", error);
  }
};

export const localStorageCheckout = (): CheckoutRepository => {
  return {
    createOrder: async (
      items: Order["items"],
      shippingInfo: ShippingInfo,
      paymentInfo: PaymentInfo,
      totals: {
        subtotal: number;
        tax: number;
        shipping: number;
        total: number;
      }
    ): Promise<Order> => {
      const orders = getOrdersFromStorage();
      const newOrder: Order = {
        id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        items,
        shippingInfo,
        paymentInfo,
        subtotal: totals.subtotal,
        tax: totals.tax,
        shipping: totals.shipping,
        total: totals.total,
        createdAt: new Date().toISOString(),
        status: "pending",
      };

      orders.push(newOrder);
      saveOrdersToStorage(orders);
      return newOrder;
    },

    getOrder: async (orderId: string): Promise<Order | null> => {
      const orders = getOrdersFromStorage();
      return orders.find((order) => order.id === orderId) || null;
    },

    getAllOrders: async (): Promise<Order[]> => {
      return getOrdersFromStorage();
    },
  };
};
