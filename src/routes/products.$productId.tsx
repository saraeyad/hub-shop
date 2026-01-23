import { createFileRoute } from '@tanstack/react-router'
import { useGetProduct } from '../modules/products/hooks/useGetProduct'
import { Container, Loader, Center, Text, Title } from '@mantine/core'
import { ProductDetails } from '../modules/products/views/ProductDetails'

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailsPage,
})

function ProductDetailsPage() {
  const { productId } = Route.useParams()
  
  const { product, isLoading, error } = useGetProduct(productId)

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    )
  }

  if (error) {
    return (
      <Container py="xl">
        <Center>
          <Text c="brown" size="lg">
            {error.message || 'Failed to load product'}
          </Text>
        </Center>
      </Container>
    )
  }

  if (!product) {
    return (
      <Container py="xl">
        <Center>
          <Title order={2}>Product not found</Title>
        </Center>
      </Container>
    )
  }

  return <ProductDetails product={product} />
}
