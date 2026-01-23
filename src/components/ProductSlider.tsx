import { Container, Title, Group, Button, Text, Box } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Link } from "@tanstack/react-router";
import { IconArrowRight } from "@tabler/icons-react";
import { ProductCard } from "../modules/products/views/ProductCard";
import type { ProductsWithDiscountPrice } from "../modules/products/hooks/useGetAllProducts";
import { motion } from "framer-motion";

type ProductSliderProps = {
  title: string;
  products: ProductsWithDiscountPrice[];
  showViewAll?: boolean;
  viewAllLink?: string;
  titleColor?: string;
  showNewBadge?: boolean;
  showCountdown?: boolean;
  countdownEndTime?: Date;
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export const ProductSlider = ({
  title,
  products,
  showViewAll = true,
  viewAllLink = "/products",
  titleColor = "white",
  showNewBadge = false,
  showCountdown = false,
  countdownEndTime,
}: ProductSliderProps) => {
  if (products.length === 0) return null;

  return (
    <Container size="xl" py="md">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <Group justify="space-between" align="center" mb="xl">
          <Group gap="md" align="center">
            <Title order={2} fw={700} c={titleColor}>
              {title}
            </Title>
            {showCountdown && countdownEndTime && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Text size="sm" c="gold.5" fw={600}>
                  🔥 Flash Sale
                </Text>
              </motion.div>
            )}
          </Group>
          {showViewAll && (
            <Button
              component={Link}
              to={viewAllLink}
              variant="subtle"
              color="white"
              rightSection={<IconArrowRight size={18} />}
              style={{ color: "white" }}
            >
              View All
            </Button>
          )}
        </Group>

        <Carousel
          slideSize={{ base: "85%", sm: "45%", md: "33.333%", lg: "25%" }}
          slideGap="lg"
          withControls
          withIndicators={false}
          controlSize={40}
          styles={{
            root: {
              padding: "0 20px",
            },
            viewport: {
              paddingBottom: "10px",
            },
            control: {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "none",
              color: "#2e2418",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 1)",
              },
              "&[data-inactive]": {
                opacity: 0,
                cursor: "default",
              },
            },
          }}
        >
          {products.map((product) => (
            <Carousel.Slide key={product.id}>
              <Box style={{ height: "100%", padding: "4px" }}>
                <ProductCard product={product} showNewBadge={showNewBadge} />
              </Box>
            </Carousel.Slide>
          ))}
        </Carousel>
      </motion.div>
    </Container>
  );
};
