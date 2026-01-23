import { createContext, useContext, type PropsWithChildren } from "react";
import type { CategoriesRepository } from "./repository/CategoriesRepository";
import { restCategories } from "./repository/restCategories";

const CategoriesContext = createContext<CategoriesRepository | null>(null);

type CategoriesProviderProps = PropsWithChildren<{
  value: CategoriesRepository;
}>;

export const CategoriesProvider = ({
  value,
  children,
}: CategoriesProviderProps) => {
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);

  if (context === null) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }

  return context;
};

export const createCategoriesModule = () => {
  const value = restCategories();
  return {
    Provider: ({ children }: PropsWithChildren) => (
      <CategoriesProvider value={value}>{children}</CategoriesProvider>
    ),
  };
};
