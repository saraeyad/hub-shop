import { Container, Title, Group, Box, Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Link } from "@tanstack/react-router";
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
  products,
  showViewAll = true,
  viewAllLink = "/products",
  showNewBadge = false,
}: ProductSliderProps) => {
  if (products.length === 0) return null;

  return (
    <Container size="xl" py={56}>
      <Group justify="space-between" align="flex-end" mb={28}>
        <Title order={2} style={{ fontSize: "2rem", fontWeight: 500 }}>
          {title} <Text span c="#111">—</Text>
        </Title>
        {showViewAll ? (
          <Text
            component={Link}
            to={viewAllLink}
            size="sm"
            style={{ color: "#111", textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            Discover
          </Text>
        ) : null}
      </Group>

      <Carousel
        slideSize={{ base: "78%", sm: "46%", md: "31%", lg: "24%" }}
        slideGap="xl"
        withControls
        withIndicators={false}
        controlSize={34}
        styles={{
          control: {
            backgroundColor: "#ffffff",
            border: "1px solid #e5e5e5",
            color: "#111",
            borderRadius: 0,
            "&[data-inactive]": { opacity: 0, cursor: "default" },
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
    </Container>
  );
};
