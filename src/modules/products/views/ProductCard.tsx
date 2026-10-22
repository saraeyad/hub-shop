import { Image, Text, Group, ActionIcon, Stack, Box } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { IconHeart } from "@tabler/icons-react";
import { useState } from "react";
import type { ProductsWithDiscountPrice } from "../hooks/useGetAllProducts";
import { useCart } from "../../cart/hooks/useCart";
import { useFavorites } from "../../favorites/hooks/useFavorites";
import toast from "react-hot-toast";

type ProductCardProps = {
  product: ProductsWithDiscountPrice;
  showNewBadge?: boolean;
};

export const ProductCard = ({ product, showNewBadge = false }: ProductCardProps) => {
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();
  const { addItem: addFavorite, removeItem: removeFavorite, isFavorite: checkFavorite } = useFavorites();
  const hasDiscount = Boolean(product.hasDiscounts && product.discountPercentage);
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
    <Stack
      gap={10}
      h="100%"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box pos="relative" h={320} style={{ background: "#fafafa" }}>
        <Link
          to="/products/$productId"
          params={{ productId: String(product.id) }}
          style={{ display: "grid", placeItems: "center", height: "100%", padding: 18 }}
        >
          <Image src={product.image} alt={product.name} mah={280} fit="contain" />
        </Link>
        <ActionIcon
          variant="transparent"
          aria-label={isFavorite ? "Remove from favorites" : "Save"}
          onClick={handleFavorite}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            opacity: hovered || isFavorite ? 1 : 0,
            color: "#111",
          }}
        >
          <IconHeart size={18} stroke={1.4} fill={isFavorite ? "#111" : "none"} />
        </ActionIcon>
      </Box>

      <Box pt={8} style={{ borderTop: "1px solid #ececec" }}>
        <Text size="xs" fw={600} style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}>
          {product.category}
        </Text>
        <Link
          to="/products/$productId"
          params={{ productId: String(product.id) }}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Text size="sm" mt={2} lineClamp={2}>
            {product.name}
          </Text>
        </Link>
        <Group gap={8} mt={6}>
          {hasDiscount ? (
            <Text size="sm" c="#999" td="line-through">
              ${product.price.toFixed(2)}
            </Text>
          ) : null}
          <Text size="sm">${price.toFixed(2)}</Text>
          {showNewBadge ? (
            <Text size="xs" c="#666">
              New
            </Text>
          ) : null}
        </Group>
        <Text
          component="button"
          onClick={handleAddToCart}
          mt={8}
          size="sm"
          disabled={!product.isAvailable}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: product.isAvailable ? "pointer" : "default",
            textDecoration: "underline",
            textUnderlineOffset: 3,
            color: "#111",
          }}
        >
          {product.isAvailable ? "Add to cart" : "Sold out"}
        </Text>
      </Box>
    </Stack>
  );
};
