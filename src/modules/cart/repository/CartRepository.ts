import type { Cart, CartItem } from "../entities/Cart";

export interface CartRepository {
  getCart: () => Cart;
  addItem: (item: CartItem) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}
