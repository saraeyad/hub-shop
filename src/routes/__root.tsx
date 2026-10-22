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

const brand: MantineColorsTuple = ['#faf7ff', '#f3ecff', '#ede6fb', '#ddd3f0', '#c4b0ea', '#a078e0', '#7c3aed', '#6d28d9', '#4c1d95', '#2e1065']
const gold: MantineColorsTuple = ['#fffbeb', '#fff4c2', '#ffe98a', '#fcdc4d', '#f8d12a', '#f6c90e', '#e0b400', '#c49c00', '#9a7a00', '#6d5600']
const gray: MantineColorsTuple = ['#f7f8fa', '#f3f0f8', '#e8edf2', '#d5dee6', '#b7c3ce', '#89949d', '#6b767e', '#575757', '#414141', '#1f2428']

const theme = createTheme({
  primaryColor: 'brand',
  primaryShade: 6,
  colors: { brand, gold, gray },
  fontFamily: '"Cairo", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  headings: {
    fontFamily: '"Cairo", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: '700',
  },
  defaultRadius: 'md',
  components: {
    Title: {
      styles: { root: { color: '#4c1d95' } },
    },
    Button: {
      defaultProps: { radius: 'md', color: 'brand' },
      styles: { root: { fontWeight: 600, fontSize: '0.9rem' } },
    },
    Card: {
      defaultProps: { radius: 'lg', shadow: 'xs', withBorder: true },
      styles: { root: { borderColor: '#ddd3f0', backgroundColor: '#ffffff' } },
    },
    Input: {
      defaultProps: { radius: 'xl' },
      styles: { input: { borderColor: '#d4c6ee', backgroundColor: '#ffffff', '&:focus': { borderColor: '#7c3aed' } } },
    },
    TextInput: {
      defaultProps: { radius: 'xl' },
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
