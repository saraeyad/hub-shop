import {
  Badge,
  Button,
  Card,
  Box,
  Image,
  Text,
} from "@mantine/core";
import { Link } from "@tanstack/react-router";
import type { ProductsWithDiscountPrice } from "../hooks/useGetAllProducts";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import toast from "react-hot-toast";

export const Product = ({ product }: { product: ProductsWithDiscountPrice }) => {
  const hasDiscount = product.hasDiscounts && product.discountPercentage;
  const { deleteProduct, isPending, error } = useDeleteProduct({
    onSuccess: () => {
      toast.success("Product deleted successfully");
    }
  });

  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Card.Section pos="relative">
        <Link
          to="/products/$productId"
          params={{ productId: String(product.id) }}
          style={{ textDecoration: "none", display: "block" }}
        >
          <Image 
            src={product.image} 
            height={200} 
            alt={product.name}
            fit="cover"
            style={{ cursor: "pointer" }}
          />
        </Link>
        {hasDiscount && (
          <Badge 
            color="gold" 
            variant="filled" 
            size="lg"
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            {product.discountPercentage}% OFF
          </Badge>
        )}
      </Card.Section>

      <Link
        to="/products/$productId"
        params={{ productId: String(product.id) }}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Text fw={600} mt="md" lineClamp={2} style={{ minHeight: 48, cursor: "pointer" }}>
          {product.name}
        </Text>
      </Link>

      <Text size="sm" c="dimmed" lineClamp={2} mt="xs">
        {product.description}
      </Text>

      <Box mt="auto" pt="md">
        {hasDiscount ? (
          <Box mb="md">
            <Text size="sm" c="dimmed" td="line-through">
              ${product.price.toFixed(2)}
            </Text>
            <Text size="xl" fw={700} c="gold.5">
              ${product.discountedPrice.toFixed(2)}
            </Text>
          </Box>
        ) : (
          <Text size="xl" fw={700} mb="md">
            ${product.price.toFixed(2)}
          </Text>
        )}

        <Button color="brown" fullWidth radius="md" mb={'5'}>
          Add to Cart
        </Button>
        <Button 
          color="red" 
          fullWidth 
          radius="md"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteProduct(product.id);
          }}
          loading={isPending}
          disabled={isPending}
        >
          Delete
        </Button>
        {error && <Text c="brown" size="sm" mt="xs">{error.message}</Text>}
      </Box>
    </Card>
  );
};