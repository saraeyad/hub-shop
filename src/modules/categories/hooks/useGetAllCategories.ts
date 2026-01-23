import { useQuery } from "@tanstack/react-query";
import type { Category } from "../entities/Category";
import { useCategories } from "../index";

const getAllCategoriesQueryKey = ["categories"];

export const useGetAllCategories = () => {
  const { getAll } = useCategories();

  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: getAllCategoriesQueryKey,
    queryFn: getAll,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  return {
    categories: data as Category[],
    isEmpty: !isLoading && !error && data.length === 0,
    isLoading,
    error,
  };
};
