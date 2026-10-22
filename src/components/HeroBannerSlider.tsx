import { Box, Button, Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import type { ProductsWithDiscountPrice } from "../modules/products/hooks/useGetAllProducts";

type HeroBannerSliderProps = {
  products: ProductsWithDiscountPrice[];
};

const SLIDE_MS = 5200;

export const HeroBannerSlider = ({ products }: HeroBannerSliderProps) => {
  const navigate = useNavigate();
  const featured = products.slice(0, 5);
  const [, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);

  useEffect(() => {
    if (!embla || paused || featured.length < 2) return;
    const timer = window.setInterval(() => embla.scrollNext(), SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [embla, paused, featured.length]);

  if (featured.length === 0) return null;

  return (
    <Box onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Carousel
        emblaOptions={{ loop: true, duration: 30 }}
        withControls
        withIndicators={false}
        height={560}
        controlSize={36}
        onSlideChange={setIndex}
        getEmblaApi={setEmbla}
        styles={{
          control: {
            background: "rgba(255,255,255,0.92)",
            border: "none",
            color: "#111",
            borderRadius: 0,
          },
        }}
      >
        {featured.map((product) => (
          <Carousel.Slide key={product.id}>
            <Box
              h="100%"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.05) 20%, rgba(0,0,0,0.45) 100%), url(${product.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
            >
              <Button
                onClick={() =>
                  navigate({
                    to: "/products/$productId",
                    params: { productId: String(product.id) },
                  })
                }
                radius={999}
                styles={{
                  root: {
                    position: "absolute",
                    top: "46%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "#f4f1ea",
                    color: "#111",
                    letterSpacing: "0.14em",
                  },
                }}
              >
                Discover our selection
              </Button>
              <Text
                style={{
                  position: "absolute",
                  left: 48,
                  bottom: 42,
                  color: "#fff",
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(3rem, 6vw, 5.5rem)",
                  lineHeight: 0.95,
                  maxWidth: "70%",
                }}
              >
                {product.name}
              </Text>
            </Box>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
};
