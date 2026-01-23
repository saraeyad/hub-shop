import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCart as useCartContext } from "..";
import type { Cart, CartItem } from "../entities/Cart";

export const useCart = () => {
  const cartRepo = useCartContext();
  const queryClient = useQueryClient();

  const { data: cart } = useQuery<Cart>({
    queryKey: ["cart"],
    queryFn: () => cartRepo.getCart(),
    staleTime: 0,
  });

  const addItemMutation = useMutation({
    mutationFn: async (item: CartItem) => {
      cartRepo.addItem(item);
      return Promise.resolve(cartRepo.getCart());
    },
    onSuccess: (newCart) => {
      queryClient.setQueryData(["cart"], newCart);
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: async (productId: number) => {
      cartRepo.removeItem(productId);
      return Promise.resolve(cartRepo.getCart());
    },
    onSuccess: (newCart) => {
      queryClient.setQueryData(["cart"], newCart);
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: number; quantity: number }) => {
      cartRepo.updateQuantity(productId, quantity);
      return Promise.resolve(cartRepo.getCart());
    },
    onSuccess: (newCart) => {
      queryClient.setQueryData(["cart"], newCart);
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      cartRepo.clearCart();
      return Promise.resolve(cartRepo.getCart());
    },
    onSuccess: (newCart) => {
      queryClient.setQueryData(["cart"], newCart);
    },
  });

  return {
    cart: cart ?? { items: [], subtotal: 0, tax: 0, shipping: 0, total: 0 },
    addItem: addItemMutation.mutate,
    removeItem: removeItemMutation.mutate,
    updateQuantity: updateQuantityMutation.mutate,
    clearCart: clearCartMutation.mutate,
    itemCount: cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0,
    isLoading: addItemMutation.isPending || removeItemMutation.isPending || updateQuantityMutation.isPending,
  };
};
