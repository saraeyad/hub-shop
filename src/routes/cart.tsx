import { createFileRoute } from '@tanstack/react-router'
import { CartPage } from '../modules/cart/views/CartPage'

export const Route = createFileRoute('/cart')({
  component: CartPage,
})
