import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { MantineProvider, createTheme, type MantineColorsTuple } from '@mantine/core'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'
import '../index.css'
import { createProductsModule } from '../modules/products/index'
import { createCategoriesModule } from '../modules/categories/index'
import { createCartModule } from '../modules/cart/index'
import { FavoritesProvider } from '../modules/favorites/index'
import { CheckoutProvider } from '../modules/checkout/index'
import { Layout } from '../components/Layout'

const brown: MantineColorsTuple = ['#faf8f6', '#f5f1ec', '#ede5db', '#e0d4c4', '#c9b8a3', '#a68b6f', '#8b6f47', '#6d5638', '#4d3d28', '#2e2418']
const gold: MantineColorsTuple = ['#fffbf0', '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00']
const gray: MantineColorsTuple = ['#fafafa', '#f5f5f5', '#eeeeee', '#e0e0e0', '#bdbdbd', '#9e9e9e', '#757575', '#616161', '#424242', '#212121']

const theme = createTheme({
  primaryColor: 'brown',
  primaryShade: 6,
  colors: { brown, gold, gray },
  fontFamily: '"Playfair Display", "Cormorant Garamond", "Georgia", serif',
  headings: {
    fontFamily: '"Playfair Display", "Cormorant Garamond", "Georgia", serif',
    fontWeight: '600',
  },
  defaultRadius: 'sm',
  components: {
    Button: {
      defaultProps: { radius: 'sm', color: 'brown' },
      styles: { root: { fontWeight: 500, letterSpacing: '0.025em', textTransform: 'uppercase', fontSize: '0.875rem' } },
    },
    Card: {
      defaultProps: { radius: 'sm', shadow: 'sm', withBorder: true },
      styles: { root: { borderColor: '#e0d4c4', backgroundColor: '#ffffff' } },
    },
    Input: {
      defaultProps: { radius: 'sm' },
      styles: { input: { borderColor: '#e0d4c4', backgroundColor: '#fafafa', '&:focus': { borderColor: '#8b6f47' } } },
    },
  },
})

const { Provider: ProductsProvider } = createProductsModule()
const { Provider: CategoriesProvider } = createCategoriesModule()
const { Provider: CartProvider } = createCartModule()

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
})

export const Route = createRootRoute({
  component: () => (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <ProductsProvider>
          <CategoriesProvider>
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
          </CategoriesProvider>
        </ProductsProvider>
        <TanStackRouterDevtools />
      </QueryClientProvider>
    </MantineProvider>
  ),
})
