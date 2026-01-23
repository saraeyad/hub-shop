import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProducts } from ".."
import type { Product } from "../entities/Product";
import type { PaginatedResponse } from "../repository/ProductsRepository";

export const useDeleteProduct = ({ onSuccess }: { onSuccess: () => void }) => {
    const { deleteOne } = useProducts();
    const queryClient = useQueryClient();
    
    const { mutate, isPending, error } = useMutation({
        mutationFn: (id: number) => deleteOne(id),
        onMutate: async (deletedId) => {
            await queryClient.cancelQueries({ queryKey: ['products'] });
            await queryClient.cancelQueries({ queryKey: ['paginated-products'] });

            // Remove from 'products' query
            queryClient.setQueryData<Product[]>(['products'], (old = []) =>
                old.filter(product => product.id !== deletedId)
            );

            // Remove from all 'paginated-products' queries
            queryClient.setQueriesData<PaginatedResponse>(
                { queryKey: ['paginated-products'] },
                (old) => old ? {
                    ...old,
                    products: old.products.filter((p: Product) => p.id !== deletedId),
                    total: Math.max(0, old.total - 1),
                } : old
            );
        },
        onSuccess: () => {
            onSuccess();
        }
    });

    return {
        deleteProduct: mutate,
        isPending,
        error
    };
}