import {
  Container,
  Grid,
  Image,
  Title,
  Text,
  Badge,
  Group,
  Stack,
  Button,
  Divider,
  Paper,
  Rating,
  Box,
} from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import type { Product } from '../entities/Product'
import { useCart } from '../../cart/hooks/useCart'
import toast from 'react-hot-toast'
import { pageTransitions, imageAnimations, reviewCardAnimations, buttonAnimations, badgeAnimations } from '../../../animations/animations'

type ProductDetailsProps = {
  product: Product
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { addItem } = useCart()
  const hasDiscount = product.hasDiscounts && product.discountPercentage
  const discountedPrice = hasDiscount && product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price

  const handleAddToCart = () => {
    try {
      addItem({
        productId: product.id,
        quantity: 1,
        price: product.price,
        name: product.name,
        image: product.image,
        discountPercentage: product.discountPercentage,
      })
      toast.success(`${product.name} added to cart!`)
    } catch {
      toast.error('Failed to add to cart')
    }
  }

  return (
    <motion.div
      initial={pageTransitions.fadeInUp.initial}
      animate={pageTransitions.fadeInUp.animate}
      transition={pageTransitions.fadeInUp.transition}
    >
      <Box
        style={{
          background: "linear-gradient(135deg, #8b6f47 0%, #6d5638 100%)",
          padding: "40px 0 60px",
          minHeight: "100vh",
        }}
      >
        <Container size="lg">
          <Grid>
          {/* Product Image */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <motion.div
              initial={imageAnimations.initial}
              animate={imageAnimations.animate}
              transition={imageAnimations.transition}
            >
              <Image
                src={product.image}
                alt={product.name}
                radius="md"
                fit="cover"
                style={{ width: '100%', height: 'auto' }}
              />
            </motion.div>
          </Grid.Col>

        {/* Product Info */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Stack gap="md">
              {/* Category Badge */}
              <motion.div
                initial={badgeAnimations.initial}
                animate={badgeAnimations.animate}
                transition={badgeAnimations.transition}
              >
                <Badge color="gold" size="lg" variant="light">
                  {product.category}
                </Badge>
              </motion.div>

            {/* Product Name */}
            <Title order={1} c="white">{product.name}</Title>

            {/* Rating */}
            <Group gap="xs">
              <Rating value={product.rating} readOnly size="sm" />
              <Text size="sm" c="gray.2">
                ({product.rating} / 5)
              </Text>
            </Group>

            {/* Price */}
            <Box>
              {hasDiscount ? (
                <Group gap="md" align="center">
                  <Text size="xl" c="gray.3" td="line-through">
                    ${product.price.toFixed(2)}
                  </Text>
                  <Text size="2rem" fw={700} c="gold.5">
                    ${discountedPrice.toFixed(2)}
                  </Text>
                  <Badge color="gold" size="lg">
                    {product.discountPercentage}% OFF
                  </Badge>
                </Group>
              ) : (
                <Text size="2rem" fw={700} c="gold.5">
                  ${product.price.toFixed(2)}
                </Text>
              )}
            </Box>

            {/* Availability */}
            <Group>
              {product.isAvailable ? (
                <Badge color="green" size="lg">
                  In Stock
                </Badge>
              ) : (
                <Badge color="brown" size="lg">
                  Out of Stock
                </Badge>
              )}
            </Group>

            <Divider />

            {/* Description */}
            <Box>
              <Title order={3} mb="sm" c="white">
                Description
              </Title>
              <Text size="md" c="gray.2">{product.description}</Text>
            </Box>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <Box>
                <Title order={3} mb="sm" c="white">
                  Tags
                </Title>
                <Group gap="xs">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="light" color="gold">
                      {tag}
                    </Badge>
                  ))}
                </Group>
              </Box>
            )}

            {/* Action Buttons */}
            <Group mt="md">
              <motion.div
                whileHover={buttonAnimations.hover}
                whileTap={buttonAnimations.tap}
              >
                <Button 
                  color="brown" 
                  size="lg" 
                  disabled={!product.isAvailable}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </motion.div>
              <motion.div
                whileHover={buttonAnimations.hover}
                whileTap={buttonAnimations.tap}
              >
                <Button component={Link} to="/products" variant="light" size="lg" color="white">
                  Back to Products
                </Button>
              </motion.div>
            </Group>
          </Stack>
          </motion.div>
        </Grid.Col>
      </Grid>
      </Container>

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <Box
          mt="xl"
          style={{
            width: '100%',
            padding: '40px 0',
            marginTop: '60px',
          }}
        >
          <Container size="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Title order={2} mb="xl" c="white" style={{ textAlign: 'center' }}>
                Customer Reviews ({product.reviews.length})
              </Title>
            </motion.div>
            <Stack gap="md">
              {product.reviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={reviewCardAnimations.initial}
                  animate={reviewCardAnimations.animate}
                  transition={{
                    ...reviewCardAnimations.transition,
                    delay: index * reviewCardAnimations.staggerDelay,
                  }}
                >
                  <Paper
                    p="lg"
                    withBorder
                    radius="md"
                    style={{
                      backgroundColor: '#faf8f6',
                      borderColor: 'rgba(224, 212, 196, 0.5)',
                    }}
                  >
                  <Group justify="space-between" mb="sm">
                    <Group gap="sm">
                      <Text fw={600} size="md" c="brown.7">
                        {review.reviewer.name}
                      </Text>
                      <Rating value={review.rating} readOnly size="sm" />
                    </Group>
                    <Text size="sm" c="dimmed">
                      {new Date(review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Text>
                  </Group>
                  <Text size="sm" c="dimmed" mb="xs">
                    {review.reviewer.email}
                  </Text>
                  <Text size="md" mt="sm" style={{ lineHeight: 1.6 }}>
                    {review.comment}
                  </Text>
                </Paper>
                </motion.div>
              ))}
            </Stack>
          </Container>
        </Box>
      )}
      </Box>
    </motion.div>
  )
}
