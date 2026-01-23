import { Stack, Box, Center, Loader } from "@mantine/core";
import { HeroBannerSlider } from "./HeroBannerSlider";
import { TrustFactors } from "./TrustFactors";
import { ProductSlider } from "./ProductSlider";
import { FlashSaleCountdown } from "./FlashSaleCountdown";
import { useGetAllProducts, type ProductsWithDiscountPrice } from "../modules/products/hooks/useGetAllProducts";

export const HomePage = () => {
  const { all: products, isLoading } = useGetAllProducts();

  const flashSaleEndTime = (() => {
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24);
    return endTime;
  })();

  if (isLoading || !products) {
    return (
      <Center h={400}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (products.length === 0) {
    return (
      <Center h={400}>
        <Loader size="lg" />
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

      <TrustFactors />

      <Box
        style={{
          background: "var(--mantine-color-brown-7)",
        }}
      >
        <ProductSlider
          title="New Arrivals"
          products={newArrivals}
          showNewBadge={true}
          viewAllLink="/products"
        />
      </Box>

      <Box
        style={{
          background: "white",
        }}
      >
        <ProductSlider
          title="Best Sellers"
          products={bestSellers}
          viewAllLink="/products"
          titleColor="brown.7"
        />
      </Box>

      {flashSaleProducts.length > 0 && (
        <Box
          style={{
            background: "var(--mantine-color-brown-7)",
          }}
        >
          <Stack gap="md" style={{ paddingTop: "40px" }}>
            <Box style={{ textAlign: "center" }} >
              <FlashSaleCountdown endTime={flashSaleEndTime} />
            </Box>
            <ProductSlider
              title="Flash Sale"
              products={flashSaleProducts}
              showViewAll={false}
              showCountdown={false}
            />
          </Stack>
        </Box>
      )}
    </Stack>
  );
};
