import type { CartRepository } from "./CartRepository";
import type { Cart, CartItem } from "../entities/Cart";

const CART_STORAGE_KEY = "shopping-cart";
const TAX_RATE = 0.1;
const SHIPPING_COST = 10;

const calculateCartTotals = (items: CartItem[]): Omit<Cart, "items"> => {
  const subtotal = items.reduce(
    (sum, item) => {
      const itemPrice = item.discountPercentage
        ? item.price * (1 - item.discountPercentage / 100)
        : item.price;
      return sum + itemPrice * item.quantity;
    },
    0
  );

  const tax = subtotal * TAX_RATE;
  const shipping = items.length > 0 ? SHIPPING_COST : 0;
  const total = subtotal + tax + shipping;

  return { subtotal, tax, shipping, total };
};

const getCartFromStorage = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (items: CartItem[]): void => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

export const localStorageCart = (): CartRepository => {
  return {
    getCart: (): Cart => {
      const items = getCartFromStorage();
      return {
        items,
        ...calculateCartTotals(items),
      };
    },

    addItem: (item: CartItem): void => {
      const items = getCartFromStorage();
      const existingIndex = items.findIndex((i) => i.productId === item.productId);

      if (existingIndex >= 0) {
        items[existingIndex].quantity += item.quantity;
      } else {
        items.push(item);
      }

      saveCartToStorage(items);
    },

    removeItem: (productId: number): void => {
      const items = getCartFromStorage();
      const filtered = items.filter((item) => item.productId !== productId);
      saveCartToStorage(filtered);
    },

    updateQuantity: (productId: number, quantity: number): void => {
      if (quantity <= 0) {
        const items = getCartFromStorage();
        const filtered = items.filter((item) => item.productId !== productId);
        saveCartToStorage(filtered);
        return;
      }

      const items = getCartFromStorage();
      const item = items.find((i) => i.productId === productId);
      if (item) {
        item.quantity = quantity;
        saveCartToStorage(items);
      }
    },

    clearCart: (): void => {
      localStorage.removeItem(CART_STORAGE_KEY);
    },

    getItemCount: (): number => {
      const items = getCartFromStorage();
      return items.reduce((sum, item) => sum + item.quantity, 0);
    },
  };
};
