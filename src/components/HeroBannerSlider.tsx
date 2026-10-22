import { Box, Button, Text } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import type { ProductsWithDiscountPrice } from "../modules/products/hooks/useGetAllProducts";

type HeroBannerSliderProps = {
  products: ProductsWithDiscountPrice[];
};

export const HeroBannerSlider = ({ products }: HeroBannerSliderProps) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const featured = products[0];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const play = () => {
      void video.play().catch(() => undefined);
    };
    play();
    video.addEventListener("ended", play);
    return () => video.removeEventListener("ended", play);
  }, []);

  const openSelection = () => {
    if (featured) {
      navigate({
        to: "/products/$productId",
        params: { productId: String(featured.id) },
      });
      return;
    }
    navigate({ to: "/products" });
  };

  return (
    <Box pos="relative" h={{ base: 460, md: 640 }} style={{ overflow: "hidden", background: "#111" }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <Box
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.08) 22%, rgba(0,0,0,0.05) 46%, rgba(0,0,0,0.42) 100%)",
        }}
      />
      <Button
        onClick={openSelection}
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
          left: 40,
          bottom: 36,
          color: "#fff",
          fontFamily: '"Playfair Display", Georgia, serif',
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: "clamp(3.2rem, 7vw, 6rem)",
          lineHeight: 0.9,
        }}
      >
        The Edit
      </Text>
    </Box>
  );
};
