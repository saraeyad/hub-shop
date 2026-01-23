import type { Product } from "../entities/Product";

export type PaginatedResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export interface ProductsRepository {
  getAll: () => Promise<Product[]>;
  getOne: (id: number) => Promise<Product>;
  getPaginated: (page: number, limit?: number) => Promise<PaginatedResponse>;
  getByCategory: (category: string) => Promise<Product[]>;
  deleteOne: (id: number) => Promise<void>;
}
