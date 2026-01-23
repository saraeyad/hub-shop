import { Carousel } from "@mantine/carousel";
import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  Box,
  Title,
  Button,
} from "@mantine/core";
import { Link } from "@tanstack/react-router";
import type { ProductsWithDiscountPrice } from "../hooks/useGetAllProducts";

type DiscountProductsCarouselProps = {
  products: ProductsWithDiscountPrice[];
};

export const DiscountProductsCarousel = ({
  products,
}: DiscountProductsCarouselProps) => {
  if (products.length === 0) return null;

  return (
    <Box mb="xl">
      <Title order={2} mb="md">
        Products with Discount
      </Title>

      <Carousel
        slideSize={{ base: "100%", sm: "50%", md: "25%" }}
        slideGap="md"
        withControls
        controlSize={36}
        // indicators omitted to remove dots under the slider
        styles={{
          control: {
            "&[data-inactive]": {
              opacity: 0,
              cursor: "default",
            },
          },
        }}
      >
        {products.map((product) => {
          return (
            <Carousel.Slide key={product.id}>
              <Box style={{ height: 280 }}>
                <Card
                  shadow="sm"
                  radius="md"
                  withBorder
                  h="100%"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 8,
                  }}
                >
                  <Card.Section pos="relative">
                    <Link
                      to="/products/$productId"
                      params={{ productId: String(product.id) }}
                      style={{ textDecoration: "none", display: "block" }}
                    >
                      <Image
                        src={product.image}
                        height={150}
                        alt={product.name}
                        fit="cover"
                        style={{ cursor: "pointer" }}
                      />
                    </Link>
                    {product.hasDiscounts && product.discountPercentage && (
                      <Badge
                        color="gold"
                        variant="filled"
                        pos="absolute"
                        top={10}
                        right={10}
                        size="lg"
                      >
                        {product.discountPercentage}% OFF
                      </Badge>
                    )}
                  </Card.Section>

                  <Box
                    p="sm"
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Link
                      to="/products/$productId"
                      params={{ productId: String(product.id) }}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Text
                        fw={600}
                        lineClamp={2}
                        mb="xs"
                        style={{ minHeight: 40, fontSize: 14, cursor: "pointer" }}
                      >
                        {product.name}
                      </Text>
                    </Link>

                    <Box mt="auto">
                      <Group gap="xs" align="center" mb="sm">
                        {product.hasDiscounts && product.discountPercentage ? (
                          <>
                            <Text size="sm" c="dimmed" td="line-through">
                              ${product.price.toFixed(2)}
                            </Text>
                            <Text size="lg" fw={700} c="gold.5">
                              ${product.discountedPrice.toFixed(2)}
                            </Text>
                          </>
                        ) : (
                          <Text size="md" fw={600}>
                            ${product.price.toFixed(2)}
                          </Text>
                        )}
                      </Group>

                      <Button color="brown" fullWidth radius="md" size="sm">
                        Add to Cart
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </Box>
  );
};
