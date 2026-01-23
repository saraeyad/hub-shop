import { Grid, Center, Loader, Text, Pagination } from "@mantine/core";
import { usePaginatedProducts } from "../hooks/usePaginatedProducts";
import { Product } from "./product";

export const AllProductsGrid = () => {
  const {
    products,
    isLoading,
    error,
    currentPage,
    totalPages,
    goToPage,
  } = usePaginatedProducts();

  if (isLoading) {
    return (
      <Center h={200}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h={200}>
        <Text c="brown">Error loading products</Text>
      </Center>
    );
  }

  return (
    <>
      <Grid>
        {products.map((product) => (
          <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 3 }}>
            <Product product={product} />
          </Grid.Col>
        ))}
      </Grid>

      {totalPages > 1 && (
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
  );
};
