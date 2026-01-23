import { useQuery } from "@tanstack/react-query";
import type { Product } from "../entities/Product";
import { useProducts } from "..";

export const getProductQueryKey = (id: number | string) => ["product", id] as const;

export const useGetProduct = (id: number | string) => {
  const { getOne } = useProducts();

  // Convert string id to number for API call
  const productId = typeof id === 'string' ? parseInt(id, 10) : id;

  const {
    data,
    error,
    isLoading,
  } = useQuery({
    queryKey: getProductQueryKey(id),
    queryFn: () => getOne(productId),
    enabled: !!productId && !isNaN(productId), // Only fetch if valid id
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    product: data,
    isEmpty: !isLoading && !error && !data,
    isLoading,
    error,
  };
};
