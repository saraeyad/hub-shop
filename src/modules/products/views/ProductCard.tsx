import { Card, Image, Text, Badge, Group, Button, ActionIcon, Stack, Box } from "@mantine/core";
import { Link, useNavigate } from "@tanstack/react-router";
import { IconHeart, IconStarFilled } from "@tabler/icons-react";
import type { ProductsWithDiscountPrice } from "../hooks/useGetAllProducts";
import { useCart } from "../../cart/hooks/useCart";
import { useFavorites } from "../../favorites/hooks/useFavorites";
import toast from "react-hot-toast";

type ProductCardProps = {
  product: ProductsWithDiscountPrice;
  showNewBadge?: boolean;
};

export const ProductCard = ({ product, showNewBadge = false }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addItem: addFavorite, removeItem: removeFavorite, isFavorite: checkFavorite } = useFavorites();
  const hasDiscount = product.hasDiscounts && product.discountPercentage;
  const isFavorite = checkFavorite(product.id);
  const price = hasDiscount ? product.discountedPrice : product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      addItem({
        productId: product.id,
        quantity: 1,
        price: product.price,
        name: product.name,
        image: product.image,
        discountPercentage: product.discountPercentage,
      });
      toast.success(`${product.name} added to cart`);
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(product.id);
      toast.success("Removed from favorites");
    } else {
      addFavorite({
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        discountPercentage: product.discountPercentage,
        addedAt: new Date().toISOString(),
      });
      toast.success("Added to favorites");
    }
  };

  return (
    <Card
      padding="md"
      radius="lg"
      withBorder
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
        borderColor: "#d7e6f2",
      }}
    >
      <Card.Section>
        <Box pos="relative" h={210} bg="#f5f6f8">
          <Link
            to="/products/$productId"
            params={{ productId: String(product.id) }}
            style={{ display: "grid", placeItems: "center", height: "100%", padding: 16 }}
          >
            <Image src={product.image} alt={product.name} mah={170} fit="contain" />
          </Link>
          <Group pos="absolute" top={12} left={12} gap={6}>
            {showNewBadge && (
              <Badge color="brand" variant="filled" radius="xl">
                New
              </Badge>
            )}
            {hasDiscount && (
              <Badge radius="xl" style={{ background: "#f6c90e", color: "#1f2428" }}>
                {product.discountPercentage}% off
              </Badge>
            )}
          </Group>
          <ActionIcon
            variant={isFavorite ? "filled" : "white"}
            color={isFavorite ? "red" : "brand"}
            radius="xl"
            onClick={handleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            style={{ position: "absolute", top: 12, right: 12 }}
          >
            <IconHeart size={16} fill={isFavorite ? "currentColor" : "none"} />
          </ActionIcon>
        </Box>
      </Card.Section>

      <Stack gap={6} mt="md" style={{ flex: 1 }}>
        <Link
          to="/products/$productId"
          params={{ productId: String(product.id) }}
          style={{ textDecoration: "none" }}
        >
          <Text fw={700} c="#286292" lineClamp={2}>
            {product.name}
          </Text>
        </Link>
        <Group gap={4}>
          <IconStarFilled size={14} color="#f6c90e" />
          <Text size="sm" fw={700} c="#1f2428">
            {product.rating.toFixed(1)}
          </Text>
        </Group>
        <Group gap={8} align="baseline">
          {hasDiscount ? (
            <Text size="sm" c="#89949d" td="line-through">
              ${product.price.toFixed(2)}
            </Text>
          ) : null}
          <Text fw={700} c="#286292">
            ${price.toFixed(2)}
          </Text>
        </Group>
      </Stack>

      <Group gap="xs" mt="md" grow>
        <Button
          variant="outline"
          color="brand"
          size="xs"
          onClick={() =>
            navigate({
              to: "/products/$productId",
              params: { productId: String(product.id) },
            })
          }
        >
          Details
        </Button>
        <Button color="brand" size="xs" onClick={handleAddToCart} disabled={!product.isAvailable}>
          Add to cart
        </Button>
      </Group>
    </Card>
  );
};
