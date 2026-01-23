import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useProducts } from "..";
import type { ProductWithDiscountPrice } from "./useGetAllProducts";
import type { Product } from "../entities/Product";

const PRODUCTS_PER_PAGE = 12;

export const usePaginatedProducts = () => {
  const { getPaginated } = useProducts();
  const [currentPage, setCurrentPage] = useState(0);

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["paginated-products", currentPage],
    queryFn: () => getPaginated(currentPage, PRODUCTS_PER_PAGE),
    staleTime: 1000 * 60 * 5, // 5 minutes
    select: (data) => ({
      ...data,
      products: data.products.map((product: Product): ProductWithDiscountPrice => ({
        ...product,
        discountedPrice:
          product.hasDiscounts && product.discountPercentage
            ? product.price * (1 - product.discountPercentage / 100)
            : product.price,
      })),
    }),
  });

  const products = data?.products ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  return {
    products,
    isLoading,
    isFetching,
    error,
    currentPage,
    totalPages,
    total,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage: currentPage < totalPages - 1,
    hasPrevPage: currentPage > 0,
  };
};
