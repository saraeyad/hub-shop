import { useQuery } from "@tanstack/react-query";
import { useProducts } from "..";
import type { ProductsWithDiscountPrice } from "./useGetAllProducts";
import type { Product } from "../entities/Product";

export const useGetProductsByCategory = (category: string | null) => {
  const { getByCategory } = useProducts();

  const { data, error, isLoading } = useQuery({
    queryKey: ["products", "category", category],
    queryFn: () => getByCategory(category!),
    enabled: !!category,
    staleTime: 1000 * 60 * 5,
    select: (data: Product[]): ProductsWithDiscountPrice[] => {
      return data.map((product) => ({
        ...product,
        discountedPrice:
          product.hasDiscounts && product.discountPercentage
            ? product.price * (1 - product.discountPercentage / 100)
            : product.price,
      }));
    },
  });

  return {
    products: data ?? [],
    isLoading,
    error,
    isEmpty: !isLoading && !error && (!data || data.length === 0),
  };
};
