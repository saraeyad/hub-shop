import { createRootRoute, Outlet } from '@tanstack/react-router'
import { MantineProvider, createTheme, type MantineColorsTuple } from '@mantine/core'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'
import '../index.css'
import { createProductsModule } from '../modules/products/index'
import { createCartModule } from '../modules/cart/index'
import { FavoritesProvider } from '../modules/favorites/index'
import { CheckoutProvider } from '../modules/checkout/index'
import { Layout } from '../components/Layout'

const brand: MantineColorsTuple = ['#fafafa', '#f5f5f5', '#e5e5e5', '#d4d4d4', '#a3a3a3', '#525252', '#171717', '#111111', '#0a0a0a', '#000000']
const gold: MantineColorsTuple = ['#fafafa', '#f5f5f5', '#e5e5e5', '#d4d4d4', '#a3a3a3', '#525252', '#171717', '#111111', '#0a0a0a', '#000000']
const gray: MantineColorsTuple = ['#fafafa', '#f5f5f5', '#eeeeee', '#e5e5e5', '#d4d4d4', '#a3a3a3', '#737373', '#525252', '#262626', '#171717']

const theme = createTheme({
  primaryColor: 'brand',
  primaryShade: 6,
  colors: { brand, gold, gray },
  fontFamily: '"Jost", "Segoe UI", Helvetica, Arial, sans-serif',
  headings: {
    fontFamily: '"Playfair Display", Georgia, serif',
    fontWeight: '500',
  },
  defaultRadius: 0,
  components: {
    Title: {
      styles: { root: { color: '#111111', fontWeight: 500 } },
    },
    Button: {
      defaultProps: { radius: 0, color: 'brand' },
      styles: { root: { fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.72rem' } },
    },
    Card: {
      defaultProps: { radius: 0, shadow: 'none', withBorder: false },
      styles: { root: { borderColor: 'transparent', backgroundColor: '#ffffff' } },
    },
    Input: {
      defaultProps: { radius: 0 },
      styles: { input: { borderColor: '#e5e5e5', backgroundColor: '#ffffff', '&:focus': { borderColor: '#111111' } } },
    },
    TextInput: {
      defaultProps: { radius: 0 },
    },
  },
})

const { Provider: ProductsProvider } = createProductsModule()
const { Provider: CartProvider } = createCartModule()

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
})

export const Route = createRootRoute({
  component: () => (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ProductsProvider>
          <CartProvider>
            <FavoritesProvider>
              <CheckoutProvider>
                <Layout>
                  <Outlet />
                </Layout>
                <Toaster />
              </CheckoutProvider>
            </FavoritesProvider>
          </CartProvider>
        </ProductsProvider>
      </QueryClientProvider>
    </MantineProvider>
  ),
})
