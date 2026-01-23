import { createContext, useContext, type ReactNode } from "react";
import { localStorageCart } from "./repository/localStorageCart";
import type { CartRepository } from "./repository/CartRepository";

const CartContext = createContext<CartRepository | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

type CartProviderProps = {
  children: ReactNode;
};

export const createCartModule = () => {
  const repository = localStorageCart();

  const Provider = ({ children }: CartProviderProps) => {
    return (
      <CartContext.Provider value={repository}>
        {children}
      </CartContext.Provider>
    );
  };

  return { Provider, useCart };
};
