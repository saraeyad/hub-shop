import { Stack, Box, Center, Loader, Group, Text, Button } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { HeroBannerSlider } from "./HeroBannerSlider";
import { TrustFactors } from "./TrustFactors";
import { ProductSlider } from "./ProductSlider";
import { FlashSaleCountdown } from "./FlashSaleCountdown";
import { Categories } from "../modules/categories/views";
import { useGetAllProducts, type ProductsWithDiscountPrice } from "../modules/products/hooks/useGetAllProducts";

export const HomePage = () => {
  const { all: products, isLoading } = useGetAllProducts();

  const flashSaleEndTime = (() => {
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24);
    return endTime;
  })();

  if (isLoading || !products || products.length === 0) {
    return (
      <Center h={400}>
        <Loader size="lg" color="brand" />
      </Center>
    );
  }

  const newArrivals = products.slice(0, 8);
  const bestSellers = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
  const flashSaleProducts = products
    .filter((p: ProductsWithDiscountPrice) => p.hasDiscounts && p.discountPercentage && p.discountPercentage >= 15)
    .slice(0, 8);

  const featuredProducts = [...products]
    .filter(
      (p: ProductsWithDiscountPrice) =>
        (p.hasDiscounts || p.rating >= 4.5) &&
        p.category.toLowerCase() !== "furniture"
    )
    .sort((a, b) => {
      if (a.hasDiscounts && !b.hasDiscounts) return -1;
      if (!a.hasDiscounts && b.hasDiscounts) return 1;
      return b.rating - a.rating;
    })
    .slice(0, 5);

  return (
    <Stack gap={0}>
      <HeroBannerSlider products={featuredProducts.length > 0 ? featuredProducts : products.slice(0, 5)} />

      <Categories />

      <Box style={{ background: "var(--band)" }}>
        <ProductSlider
          title="New arrivals"
          subtitle="Just in, ready to browse."
          products={newArrivals}
          showNewBadge
        />
      </Box>

      <ProductSlider
        title="Best sellers"
        subtitle="The highest rated picks from the catalog."
        products={bestSellers}
      />

      {flashSaleProducts.length > 0 && (
        <Box style={{ background: "#ede6fb" }} py={8}>
          <Stack gap="md" pt={28}>
            <FlashSaleCountdown endTime={flashSaleEndTime} />
            <ProductSlider title="Flash sale" products={flashSaleProducts} showViewAll={false} />
          </Stack>
        </Box>
      )}

      <TrustFactors />

      <Box px="lg" pb={72}>
        <Group
          justify="space-between"
          align="center"
          maw={1120}
          mx="auto"
          p={{ base: "lg", md: 36 }}
          wrap="wrap"
          gap="lg"
          style={{ background: "#ffffff", borderRadius: 24, border: "1px solid #ddd3f0" }}
        >
          <Stack gap={6} maw={640}>
            <Text fw={700} size="xl" c="#4c1d95">
              Ready to look through the catalog?
            </Text>
            <Text c="#575757">
              Discounts, ratings, and a cart that stays on this device.
            </Text>
          </Stack>
          <Button component={Link} to="/products" size="md" radius="md" color="brand">
            Shop the catalog
          </Button>
        </Group>
      </Box>
    </Stack>
  );
};
