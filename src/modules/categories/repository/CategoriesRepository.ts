import type { Category } from "../entities/Category";

export type CategoriesRepository = {
  getAll: () => Promise<Category[]>;
};
