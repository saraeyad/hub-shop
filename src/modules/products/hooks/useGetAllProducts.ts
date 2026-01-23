import { useQuery } from "@tanstack/react-query";
import type { Product } from "../entities/Product";
import { useProducts } from "..";

export type ProductsWithDiscountPrice = Product & {
  discountedPrice: number;
};

type selectQuery = {
  all: ProductsWithDiscountPrice[];
  productsWithDiscount: ProductsWithDiscountPrice[];
};

const getAllQueryKey = ["products"];

export const useGetAllProducts = () => {
  const { getAll } = useProducts();
  const {
    data = {
      all: [],
      productsWithDiscount: [],
    },
    error,
    isLoading,
  } = useQuery({
    queryKey: getAllQueryKey,
    queryFn: getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
    select: (data: Product[]): selectQuery => {
      const productsWithPrice = data.map((product) => ({
        ...product,
        discountedPrice:
          product.hasDiscounts && product.discountPercentage
            ? product.price * (1 - product.discountPercentage / 100)
            : product.price,
      }));

      return {
        all: productsWithPrice,
        productsWithDiscount: productsWithPrice.filter(
          (product) => product.hasDiscounts
        ),
      };
    },
  });

  return {
    all: data.all,
    productWithdiscount: data.productsWithDiscount,
    isEmpty: !isLoading && !error && data.all.length === 0,
    isLoading,
    error,
  };
};

useGetAllProducts.queryKey = getAllQueryKey;