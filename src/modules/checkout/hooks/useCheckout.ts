import { useMutation } from "@tanstack/react-query";
import { useCheckout as useCheckoutContext } from "../index";
import type { ShippingInfo, PaymentInfo } from "../entities/Order";
import type { OrderItem } from "../entities/Order";

type CreateOrderParams = {
  items: OrderItem[];
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  totals: {
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
  };
};

export const useCheckout = () => {
  const checkoutRepo = useCheckoutContext();

  const createOrderMutation = useMutation({
    mutationFn: async (params: CreateOrderParams) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return await checkoutRepo.createOrder(
        params.items,
        params.shippingInfo,
        params.paymentInfo,
        params.totals
      );
    },
  });

  return {
    createOrder: createOrderMutation.mutateAsync,
    isProcessing: createOrderMutation.isPending,
    error: createOrderMutation.error,
  };
};
