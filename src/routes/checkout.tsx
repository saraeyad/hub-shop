import { createFileRoute } from '@tanstack/react-router'
import { CheckoutPage } from '../modules/checkout/views/CheckoutPage'

export const Route = createFileRoute('/checkout')({
  component: CheckoutPage,
})
