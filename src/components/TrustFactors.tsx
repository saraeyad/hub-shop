import { Text, Box, SimpleGrid, Stack } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { IconHanger, IconTruck, IconSparkles } from "@tabler/icons-react";

const factors = [
  {
    icon: IconHanger,
    title: "A considered edit",
    text: "Pieces chosen for the way they sit together.",
  },
  {
    icon: IconTruck,
    title: "Free delivery and returns",
    text: "On orders over $50, sent back within 30 days.",
  },
  {
    icon: IconSparkles,
    title: "The quiet extras",
    text: "Ratings, favorites, and a cart that stays with you.",
  },
];

export const TrustFactors = () => {
  return (
    <Box py={48} px="lg" style={{ borderBottom: "1px solid #eee" }}>
      <SimpleGrid cols={{ base: 1, sm: 3 }} maw={1000} mx="auto" spacing={40}>
        {factors.map((factor) => (
          <Stack key={factor.title} align="center" gap={6} ta="center">
            <factor.icon size={22} stroke={1.2} color="#111" />
            <Text fw={600} size="sm" c="#111">
              {factor.title}
            </Text>
            <Text size="sm" c="#666" maw={240}>
              {factor.text}
            </Text>
            <Text
              component={Link}
              to="/products"
              size="sm"
              style={{ color: "#111", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              Discover
            </Text>
          </Stack>
        ))}
      </SimpleGrid>
    </Box>
  );
};
