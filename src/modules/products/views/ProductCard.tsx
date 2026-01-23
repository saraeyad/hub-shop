import { Card, Image, Text, Badge, Group, Button, ActionIcon, Stack } from "@mantine/core";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { IconHeart, IconShoppingCart, IconEye } from "@tabler/icons-react";
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
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addItem: addFavorite, removeItem: removeFavorite, isFavorite: checkFavorite } = useFavorites();
  const hasDiscount = product.hasDiscounts && product.discountPercentage;
  const isFavorite = checkFavorite(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
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
      toast.success(`${product.name} added to cart!`);
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

  const handleViewProduct = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate({
      to: "/products/$productId",
      params: { productId: String(product.id) },
    });
  };

  return (
    <Card
      shadow="none"
      padding={0}
      radius="sm"
      withBorder={false}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        background: "transparent",
        border: "0.5px solid rgba(224, 212, 196, 0.8)",
        borderRadius: 8,
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      component={motion.div}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card.Section
        pos="relative"
        style={{
          overflow: "hidden",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#faf8f6",
        }}
      >
        <Link
          to="/products/$productId"
          params={{ productId: String(product.id) }}
          style={{ textDecoration: "none", display: "block", width: "100%", height: "100%" }}
        >
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              filter: isHovered ? "brightness(0.7)" : "brightness(1)",
            }}
            transition={{ duration: 0.3 }}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fit="contain"
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.2))",
              }}
            />
          </motion.div>
        </Link>

        <Group
          pos="absolute"
          top={12}
          left={12}
          gap="xs"
          style={{ zIndex: 2 }}
        >
          {showNewBadge && (
            <Badge color="gold" size="md" variant="filled">
              NEW
            </Badge>
          )}
          {hasDiscount && (
            <Badge color="gold" size="md" variant="filled">
              {product.discountPercentage}% OFF
            </Badge>
          )}
        </Group>

        <ActionIcon
          variant={isFavorite ? "filled" : "light"}
          color={isFavorite ? "red" : "brown"}
          size="md"
          radius="xl"
          onClick={handleFavorite}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 2,
          }}
        >
          <IconHeart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </ActionIcon>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20,
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "20px",
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)",
            zIndex: 3,
          }}
        >
          <Stack gap="sm">
            <Text
              fw={600}
              size="lg"
              c="white"
              lineClamp={2}
              style={{
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              {product.name}
            </Text>

            <Group gap="xs" align="center">
              {hasDiscount ? (
                <>
                  <Text size="sm" c="gray.3" td="line-through">
                    ${product.price.toFixed(2)}
                  </Text>
                  <Text size="xl" fw={700} c="gold.5">
                    ${product.discountedPrice.toFixed(2)}
                  </Text>
                </>
              ) : (
                <Text size="xl" fw={700} c="gold.5">
                  ${product.price.toFixed(2)}
                </Text>
              )}
            </Group>

            <Group gap="xs" mt="xs">
              <Button
                variant="outline"
                color="white"
                size="sm"
                fullWidth
                onClick={handleViewProduct}
                leftSection={<IconEye size={16} />}
                style={{
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  borderColor: "rgba(255,255,255,0.5)",
                  color: "white",
                }}
              >
                View Details
              </Button>
              <Button
                variant="filled"
                color="brown"
                size="sm"
                fullWidth
                onClick={handleAddToCart}
                leftSection={<IconShoppingCart size={16} />}
                disabled={!product.isAvailable}
                style={{
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Add to Cart
              </Button>
            </Group>
          </Stack>
        </motion.div>
      </Card.Section>
    </Card>
  );
};

