import { Stack, Center, Loader } from "@mantine/core";
import { HeroBannerSlider } from "./HeroBannerSlider";
import { TrustFactors } from "./TrustFactors";
import { ProductSlider } from "./ProductSlider";
import { useGetAllProducts, type ProductsWithDiscountPrice } from "../modules/products/hooks/useGetAllProducts";

export const HomePage = () => {
  const { all: products, isLoading } = useGetAllProducts();

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
      <TrustFactors />
      <ProductSlider title="Selected for you" products={bestSellers} />
      <ProductSlider title="New arrivals" products={newArrivals} showNewBadge />
      {flashSaleProducts.length > 0 ? (
        <ProductSlider title="The edit" products={flashSaleProducts} showViewAll={false} />
      ) : null}
    </Stack>
  );
};
