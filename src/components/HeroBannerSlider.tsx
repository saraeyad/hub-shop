import { Box, Button, Group, Stack, Text, Title, Image, TextInput, ActionIcon } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { IconArrowLeft, IconArrowRight, IconSearch, IconStarFilled } from "@tabler/icons-react";
import { useState } from "react";
import type { ProductsWithDiscountPrice } from "../modules/products/hooks/useGetAllProducts";

type HeroBannerSliderProps = {
  products: ProductsWithDiscountPrice[];
};

export const HeroBannerSlider = ({ products }: HeroBannerSliderProps) => {
  const navigate = useNavigate();
  const featured = products.slice(0, 5);
  const [index, setIndex] = useState(0);
  const [query, setQuery] = useState("");

  if (featured.length === 0) return null;

  const product = featured[index % featured.length];
  const price = product.hasDiscounts && product.discountPercentage ? product.discountedPrice : product.price;

  const go = (direction: number) => {
    setIndex((current) => (current + direction + featured.length) % featured.length);
  };

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/products" });
  };

  return (
    <Box py={{ base: 28, md: 56 }}>
      <Box maw={1120} mx="auto" px="lg">
        <Group align="center" justify="space-between" wrap="wrap" gap={40}>
          <Stack gap="md" maw={520} style={{ flex: "1 1 320px" }}>
            <Text fw={600} c="#4b9ad2" size="sm">
              Featured product
            </Text>
            <Title order={1} style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.15, color: "#286292" }}>
              {product.name}
            </Title>
            <Text c="#575757" size="lg" lineClamp={3}>
              {product.description}
            </Text>
            <Group gap="xs">
              <IconStarFilled size={16} color="#f6c90e" />
              <Text size="sm" c="#575757">
                {product.rating.toFixed(1)} / 5 customer rating
              </Text>
            </Group>
            <Group gap="sm" align="flex-end">
              {product.hasDiscounts && product.discountPercentage ? (
                <Text td="line-through" c="#89949d">
                  ${product.price.toFixed(2)}
                </Text>
              ) : null}
              <Text fw={700} size="xl" c="#286292">
                ${price.toFixed(2)}
              </Text>
              {product.hasDiscounts && product.discountPercentage ? (
                <Text size="sm" fw={700} px={8} py={2} style={{ background: "#f6c90e", borderRadius: 999, color: "#1f2428" }}>
                  {product.discountPercentage}% off
                </Text>
              ) : null}
            </Group>

            <form onSubmit={search}>
              <Group gap="xs" wrap="nowrap" align="center">
                <TextInput
                  placeholder="Search products"
                  value={query}
                  onChange={(e) => setQuery(e.currentTarget.value)}
                  leftSection={<IconSearch size={16} />}
                  radius="xl"
                  style={{ flex: 1 }}
                />
                <Button type="submit" radius="xl" color="brand">
                  Search
                </Button>
              </Group>
            </form>

            <Group gap="sm">
              <Button
                radius="md"
                color="brand"
                rightSection={<IconArrowRight size={18} />}
                onClick={() =>
                  navigate({
                    to: "/products/$productId",
                    params: { productId: String(product.id) },
                  })
                }
              >
                Shop now
              </Button>
              <Button radius="md" variant="outline" color="brand" onClick={() => navigate({ to: "/products" })}>
                View all products
              </Button>
            </Group>
          </Stack>

          <Stack align="center" gap="md" style={{ flex: "1 1 280px" }}>
            <Box
              style={{
                width: "100%",
                maxWidth: 460,
                minHeight: 360,
                background: "#ffffff",
                borderRadius: 28,
                border: "1px solid #d7e6f2",
                display: "grid",
                placeItems: "center",
                padding: 24,
              }}
            >
              <Image src={product.image} alt={product.name} mah={320} fit="contain" />
            </Box>
            <Group gap="md">
              <ActionIcon variant="outline" color="brand" radius="xl" size="lg" onClick={() => go(-1)} aria-label="Previous product">
                <IconArrowLeft size={18} />
              </ActionIcon>
              <Text size="sm" c="#89949d">
                {String(index + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
              </Text>
              <ActionIcon variant="outline" color="brand" radius="xl" size="lg" onClick={() => go(1)} aria-label="Next product">
                <IconArrowRight size={18} />
              </ActionIcon>
            </Group>
          </Stack>
        </Group>
      </Box>
    </Box>
  );
};
