import type { Category } from "../entities/Category";
import type { CategoriesRepository } from "./CategoriesRepository";
import { toCategory } from "../adapters/toCategory";

const BASE_URL = "https://dummyjson.com/products/categories";

export const restCategories = (): CategoriesRepository => {
  return {
    getAll: async (): Promise<Category[]> => {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      return toCategory(data);
    },
  };
};
