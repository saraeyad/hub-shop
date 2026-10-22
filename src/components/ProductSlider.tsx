import { Container, Title, Group, Button, Box, Stack, Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Link } from "@tanstack/react-router";
import { IconArrowRight } from "@tabler/icons-react";
import { ProductCard } from "../modules/products/views/ProductCard";
import type { ProductsWithDiscountPrice } from "../modules/products/hooks/useGetAllProducts";

type ProductSliderProps = {
  title: string;
  subtitle?: string;
  products: ProductsWithDiscountPrice[];
  showViewAll?: boolean;
  viewAllLink?: string;
  showNewBadge?: boolean;
};

export const ProductSlider = ({
  title,
  subtitle,
  products,
  showViewAll = true,
  viewAllLink = "/products",
  showNewBadge = false,
}: ProductSliderProps) => {
  if (products.length === 0) return null;

  return (
    <Container size="xl" py={48}>
      <Stack align="center" gap={6} mb="xl">
        <Title order={2} ta="center" c="#4c1d95">
          {title}
        </Title>
        <Box style={{ width: 56, height: 2, background: "#7c3aed" }} />
        {subtitle ? (
          <Text c="#575757" ta="center" maw={520}>
            {subtitle}
          </Text>
        ) : null}
      </Stack>

      <Carousel
        slideSize={{ base: "85%", sm: "48%", md: "31%", lg: "23%" }}
        slideGap="lg"
        withControls
        withIndicators={false}
        controlSize={42}
        styles={{
          control: {
            backgroundColor: "#ffffff",
            border: "1px solid #d4c6ee",
            color: "#4c1d95",
            "&[data-inactive]": {
              opacity: 0,
              cursor: "default",
            },
          },
        }}
      >
        {products.map((product) => (
          <Carousel.Slide key={product.id}>
            <Box h="100%">
              <ProductCard product={product} showNewBadge={showNewBadge} />
            </Box>
          </Carousel.Slide>
        ))}
      </Carousel>

      {showViewAll ? (
        <Group justify="center" mt="xl">
          <Button component={Link} to={viewAllLink} variant="subtle" color="brand" rightSection={<IconArrowRight size={16} />}>
            View all
          </Button>
        </Group>
      ) : null}
    </Container>
  );
};
