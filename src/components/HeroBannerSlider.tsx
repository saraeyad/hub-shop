import { Box, Button, Stack, Text, Title, Badge, Group } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";
import type { ProductsWithDiscountPrice } from "../modules/products/hooks/useGetAllProducts";

type HeroBannerSliderProps = {
  products: ProductsWithDiscountPrice[];
};

export const HeroBannerSlider = ({ products }: HeroBannerSliderProps) => {
  const navigate = useNavigate();

  const handleSlideClick = (productId: number) => {
    navigate({
      to: "/products/$productId",
      params: { productId: String(productId) },
    });
  };

  const featuredProducts = products.slice(0, 5);

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <Box
      style={{
        position: "relative",
        width: "100%",
        height: "600px",
        overflow: "hidden",
      }}
    >
      <Carousel
        height="100%"
        slideSize="100%"
        withIndicators
        withControls
        controlSize={40}
        styles={{
          root: {
            height: "100%",
          },
          viewport: {
            height: "100%",
          },
          slide: {
            height: "100%",
          },
          control: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "none",
            color: "#000",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
            },
            "&[data-inactive]": {
              opacity: 0,
              cursor: "default",
            },
          },
          indicators: {
            bottom: 20,
          },
          indicator: {
            width: 12,
            height: 12,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            "&[data-active]": {
              backgroundColor: "rgba(255, 255, 255, 1)",
            },
          },
        }}
      >
        {featuredProducts.map((product, index) => (
          <Carousel.Slide key={product.id}>
            <Box
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                cursor: "pointer",
                backgroundImage: `url(${product.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            //   onClick={() => handleSlideClick(product.id)}
            >
              <Box
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(135deg, rgba(45, 36, 24, 0.85) 0%, rgba(107, 111, 71, 0.6) 50%, rgba(45, 36, 24, 0.8) 100%)",
                }}
              />

              <Stack
                gap="lg"
                style={{
                  position: "relative",
                  height: "100%",
                  padding: "80px 60px",
                  justifyContent: "center",
                  maxWidth: "900px",
                  zIndex: 1,
                }}
              >
                {product.hasDiscounts && product.discountPercentage && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Badge
                      size="xl"
                      color="gold"
                      variant="filled"
                      style={{ width: "fit-content", fontSize: "14px", padding: "8px 16px", color: "#2e2418", fontWeight: 600 }}
                    >
                      {product.discountPercentage}% OFF - LIMITED TIME
                    </Badge>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                >
                  <Badge
                    color="brown"
                    size="lg"
                    variant="light"
                    style={{ width: "fit-content", marginBottom: 8, backgroundColor: "rgba(255, 255, 255, 0.2)", color: "#ffffff" }}
                  >
                    Featured Product
                  </Badge>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                >
                  <Title
                    order={1}
                    c="white"
                    size="4.5rem"
                    fw={900}
                    style={{ lineHeight: 1.2, textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
                  >
                    {product.name}
                  </Title>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                >
                  <Text
                    size="xl"
                    c="gray.2"
                    style={{
                      maxWidth: "700px",
                      lineHeight: 1.6,
                      textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                    }}
                    lineClamp={3}
                  >
                    {product.description}
                  </Text>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                >
                  <Group gap="md" align="center">
                    {product.hasDiscounts && product.discountPercentage ? (
                      <>
                        <Text size="2rem" c="gray.3" td="line-through" fw={500} style={{ opacity: 0.7 }}>
                          ${product.price.toFixed(2)}
                        </Text>
                        <Text size="3rem" c="gold.5" fw={700} style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)", letterSpacing: "0.02em" }}>
                          ${product.discountedPrice.toFixed(2)}
                        </Text>
                      </>
                    ) : (
                      <Text size="3rem" c="gold.5" fw={700} style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)", letterSpacing: "0.02em" }}>
                        ${product.price.toFixed(2)}
                      </Text>
                    )}
                  </Group>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                >
                  <Group gap="md">
                    <Button
                      size="lg"
                      variant="filled"
                      color="brown"
                      rightSection={<IconArrowRight size={20} />}
                      style={{
                        fontSize: "14px",
                        padding: "16px 36px",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        backgroundColor: "#8b6f47",
                        "&:hover": {
                          backgroundColor: "#6d5638",
                        },
                      }}
                      component={motion.div}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSlideClick(product.id);
                      }}
                    >
                      Shop Now
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      color="brown"
                      style={{
                        fontSize: "14px",
                        padding: "16px 36px",
                        borderWidth: 2,
                        borderColor: "#ffffff",
                        color: "#ffffff",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                      }}
                      component={motion.div}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate({ to: "/products" });
                      }}
                    >
                      View All Products
                    </Button>
                  </Group>
                </motion.div>
              </Stack>
            </Box>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
};
