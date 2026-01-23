import { createContext, useContext, type ReactNode } from "react";
import { localStorageCheckout } from "./repository/localStorageCheckout";
import type { CheckoutRepository } from "./repository/CheckoutRepository";

const CheckoutContext = createContext<CheckoutRepository | null>(null);

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }
  return context;
};

type CheckoutProviderProps = {
  children: ReactNode;
};

export const CheckoutProvider = ({ children }: CheckoutProviderProps) => {
  const repository = localStorageCheckout();

  return (
    <CheckoutContext.Provider value={repository}>
      {children}
    </CheckoutContext.Provider>
  );
};
