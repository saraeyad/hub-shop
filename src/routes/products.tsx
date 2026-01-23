import { createFileRoute, Outlet, useMatchRoute, Link } from '@tanstack/react-router'
import { Breadcrumbs, Stack, Loader, Text, Center, Grid, Pagination, Box, Anchor } from '@mantine/core'
import { IconHome, IconChevronRight } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { ProductCard } from '../modules/products/views/ProductCard'
import { useGetProductsByCategory } from '../modules/products/hooks/useGetProductsByCategory'
import { usePaginatedProducts } from '../modules/products/hooks/usePaginatedProducts'
import { pageTransitions, breadcrumbAnimations, productCardAnimations, getStaggerDelay } from '../animations/animations'

export const Route = createFileRoute('/products')({
  validateSearch: (search: Record<string, unknown>): { category?: string } => {
    return {
      category: (search.category as string) || undefined,
    }
  },
  component: ProductsPage,
})

function ProductsPage() {
  const { category } = Route.useSearch()
  const matchRoute = useMatchRoute()
  const isProductDetailPage = matchRoute({ to: '/products/$productId' })
  
  const {
    products: categoryProducts,
    isLoading: isLoadingCategory,
    isEmpty: isEmptyCategory,
    error: categoryError,
  } = useGetProductsByCategory(category || null)

  const {
    products: allProducts,
    isLoading: isLoadingAll,
    currentPage,
    totalPages,
    goToPage,
    error: allError,
  } = usePaginatedProducts()

  const products = category ? categoryProducts : allProducts
  const isLoading = category ? isLoadingCategory : isLoadingAll
  const isEmpty = category ? isEmptyCategory : allProducts.length === 0
  const error = category ? categoryError : allError

  if (isProductDetailPage) {
    return <Outlet />
  }

  return (
    <motion.div
      initial={pageTransitions.fadeInUp.initial}
      animate={pageTransitions.fadeInUp.animate}
      transition={pageTransitions.fadeInUp.transition}
    >
      <Box
        style={{
          background: 'linear-gradient(135deg, #8b6f47 0%, #6d5638 100%)',
          minHeight: '100vh',
          padding: '40px 0 60px',
        }}
      >
        <Stack gap="xl" px="lg">
          <motion.div
            initial={breadcrumbAnimations.initial}
            animate={breadcrumbAnimations.animate}
            transition={breadcrumbAnimations.transition}
          >
            <Breadcrumbs
              separator={
                <>
                  <Text span c="white" style={{ opacity: 0.6, marginRight: '2px' }}>..</Text>
                  <IconChevronRight 
                    size={16} 
                    style={{ 
                      color: 'rgba(255, 255, 255, 0.6)',
                      margin: '0 4px'
                    }} 
                  />
                </>
              }
            >
              <Anchor
                component={Link}
                to="/"
                c="white"
                size="sm"
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  opacity: 0.9,
                  transition: 'opacity 0.2s ease',
                }}
              >
                <IconHome size={16} style={{ marginRight: '10px' }} />
                Home
              </Anchor>
              <Anchor
                component={Link}
                to="/products"
                c="white"
                size="sm"
                style={{
                  textDecoration: 'none',
                  opacity: category ? 0.9 : 1,
                  fontWeight: category ? 400 : 600,
                  transition: 'opacity 0.2s ease',
                }}
              >
                Products
              </Anchor>
              {category && (
                <Text 
                  c="white" 
                  size="sm"
                  fw={600}
                  style={{
                    textTransform: 'capitalize',
                    letterSpacing: '0.01em',
                  }}
                >
                  {category}
                </Text>
              )}
            </Breadcrumbs>
          </motion.div>

        {error ? (
          <Center h={300}>
            <Text size="lg" c="gray.2">
              Failed to load products. Please try again.
            </Text>
          </Center>
        ) : isLoading ? (
          <Center h={300}>
            <Loader size="lg" />
          </Center>
        ) : isEmpty ? (
          <Center h={300}>
            <Text size="lg" c="gray.2">
              No products found{category ? ' in this category' : ''}.
            </Text>
          </Center>
        ) : (
          <>
            <Grid gutter="xl">
              {products.map((product, index) => (
                <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                  <motion.div
                    initial={productCardAnimations.initial}
                    animate={productCardAnimations.animate}
                    transition={{
                      ...productCardAnimations.transition,
                      delay: getStaggerDelay(index),
                    }}
                  >
                    <ProductCard product={product} showNewBadge={false} />
                  </motion.div>
                </Grid.Col>
              ))}
            </Grid>

            {!category && totalPages > 1 && (
              <Center mt="xl">
                <Pagination
                  total={totalPages}
                  value={currentPage + 1}
                  onChange={(page) => goToPage(page - 1)}
                  size="lg"
                  radius="md"
                  withEdges
                />
              </Center>
            )}
          </>
        )}
      </Stack>
      </Box>
    </motion.div>
  )
}
