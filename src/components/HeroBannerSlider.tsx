import { Box, Button, Group, Stack, Text, Image } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useNavigate } from "@tanstack/react-router";
import { IconArrowRight, IconStarFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import type { ProductsWithDiscountPrice } from "../modules/products/hooks/useGetAllProducts";

type HeroBannerSliderProps = {
  products: ProductsWithDiscountPrice[];
};

const SLIDE_MS = 4800;

export const HeroBannerSlider = ({ products }: HeroBannerSliderProps) => {
  const navigate = useNavigate();
  const featured = products.slice(0, 5);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);

  useEffect(() => {
    if (!embla || paused || featured.length < 2) return;
    const timer = window.setInterval(() => embla.scrollNext(), SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [embla, paused, featured.length]);

  if (featured.length === 0) return null;

  return (
    <Box
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ background: "#2e1065", color: "#ffffff", overflow: "hidden" }}
    >
      <Carousel
        emblaOptions={{ loop: true, duration: 28 }}
        withControls={false}
        withIndicators={false}
        slideSize="100%"
        onSlideChange={setIndex}
        getEmblaApi={setEmbla}
        styles={{ viewport: { overflow: "hidden" } }}
      >
        {featured.map((product, slideIndex) => {
          const price = product.hasDiscounts && product.discountPercentage ? product.discountedPrice : product.price;
          return (
            <Carousel.Slide key={product.id}>
              <Box maw={1120} mx="auto" px="lg" py={{ base: 36, md: 64 }} pos="relative">
                <Text
                  style={{
                    position: "absolute",
                    top: 8,
                    left: 24,
                    fontSize: "clamp(7rem, 16vw, 12rem)",
                    fontWeight: 700,
                    lineHeight: 0.8,
                    color: "rgba(255,255,255,0.06)",
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  {String(slideIndex + 1).padStart(2, "0")}
                </Text>
                <Group align="center" justify="space-between" wrap="wrap" gap={32}>
                  <Stack gap="md" maw={540} style={{ flex: "1 1 300px", position: "relative" }}>
                    <Text fw={600} size="sm" style={{ letterSpacing: "0.14em", textTransform: "uppercase", color: "#d4c2f7" }}>
                      Featured {String(slideIndex + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
                    </Text>
                    <Text component="h1" fw={700} style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.05, color: "#ffffff", margin: 0 }}>
                      {product.name}
                    </Text>
                    <Text size="lg" lineClamp={3} style={{ color: "rgba(255,255,255,0.78)" }}>
                      {product.description}
                    </Text>
                    <Group gap="xs">
                      <IconStarFilled size={16} color="#f6c90e" />
                      <Text size="sm" style={{ color: "rgba(255,255,255,0.85)" }}>
                        {product.rating.toFixed(1)} / 5
                      </Text>
                    </Group>
                    <Group gap="sm" align="center">
                      {product.hasDiscounts && product.discountPercentage ? (
                        <Text td="line-through" style={{ color: "rgba(255,255,255,0.5)" }}>
                          ${product.price.toFixed(2)}
                        </Text>
                      ) : null}
                      <Text fw={700} size="xl" c="white">
                        ${price.toFixed(2)}
                      </Text>
                      {product.hasDiscounts && product.discountPercentage ? (
                        <Text size="sm" fw={700} px={8} py={2} style={{ background: "#f6c90e", borderRadius: 999, color: "#2e1065" }}>
                          {product.discountPercentage}% off
                        </Text>
                      ) : null}
                    </Group>
                    <Group gap="sm">
                      <Button
                        radius="xl"
                        rightSection={<IconArrowRight size={18} />}
                        onClick={() =>
                          navigate({
                            to: "/products/$productId",
                            params: { productId: String(product.id) },
                          })
                        }
                        styles={{ root: { background: "#ffffff", color: "#4c1d95" } }}
                      >
                        Shop now
                      </Button>
                      <Button
                        radius="xl"
                        variant="outline"
                        onClick={() => navigate({ to: "/products" })}
                        styles={{ root: { borderColor: "rgba(255,255,255,0.55)", color: "#ffffff" } }}
                      >
                        View all
                      </Button>
                    </Group>
                  </Stack>

                  <Box style={{ flex: "1 1 280px", minHeight: 320, position: "relative" }}>
                    <Box
                      style={{
                        position: "absolute",
                        inset: "18px 28px",
                        borderRadius: 40,
                        border: "1px solid rgba(255,255,255,0.22)",
                        transform: "rotate(8deg)",
                      }}
                    />
                    <Box
                      style={{
                        position: "relative",
                        height: 360,
                        margin: "12px 20px",
                        borderRadius: 40,
                        background: "rgba(255,255,255,0.08)",
                        display: "grid",
                        placeItems: "center",
                        padding: 28,
                      }}
                    >
                      <Image src={product.image} alt={product.name} mah={280} fit="contain" />
                    </Box>
                  </Box>
                </Group>
              </Box>
            </Carousel.Slide>
          );
        })}
      </Carousel>

      <Box maw={1120} mx="auto" px="lg" pb={28}>
        <Box
          mb="md"
          style={{ height: 3, borderRadius: 99, background: "rgba(255,255,255,0.16)", overflow: "hidden" }}
        >
          <Box
            key={`${index}-${paused ? "paused" : "run"}`}
            style={{
              height: "100%",
              width: paused ? "100%" : undefined,
              background: "#f6c90e",
              animation: paused ? "none" : `hero-progress ${SLIDE_MS}ms linear`,
            }}
          />
        </Box>
        <Group gap="xs" wrap="wrap">
          {featured.map((product, slideIndex) => {
            const active = slideIndex === index;
            return (
              <Button
                key={product.id}
                size="xs"
                radius="xl"
                variant={active ? "filled" : "outline"}
                onClick={() => embla?.scrollTo(slideIndex)}
                styles={{
                  root: {
                    background: active ? "#ffffff" : "transparent",
                    color: active ? "#2e1065" : "rgba(255,255,255,0.85)",
                    borderColor: active ? "#ffffff" : "rgba(255,255,255,0.28)",
                  },
                }}
              >
                {String(slideIndex + 1).padStart(2, "0")} {product.name.length > 22 ? `${product.name.slice(0, 20)}…` : product.name}
              </Button>
            );
          })}
        </Group>
      </Box>
    </Box>
  );
};
