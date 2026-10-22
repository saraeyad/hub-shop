import { Text, Box, SimpleGrid, Stack } from "@mantine/core";
import { IconTruck, IconRotateClockwise, IconShieldLock } from "@tabler/icons-react";

const trustFactors = [
  {
    icon: IconTruck,
    title: "Free shipping",
    text: "On orders over $50.",
  },
  {
    icon: IconRotateClockwise,
    title: "Easy returns",
    text: "30 days to change your mind.",
  },
  {
    icon: IconShieldLock,
    title: "Secure payments",
    text: "Checkout that stays on this device.",
  },
];

export const TrustFactors = () => {
  return (
    <Box py={64} px="lg">
      <Stack align="center" gap={6} mb={36}>
        <Text fw={700} size="xl" c="#286292" ta="center">
          A clearer way to shop
        </Text>
        <Box style={{ width: 56, height: 2, background: "#4b9ad2" }} />
      </Stack>
      <SimpleGrid cols={{ base: 1, sm: 3 }} maw={960} mx="auto" spacing="xl">
        {trustFactors.map((factor) => (
          <Stack key={factor.title} gap={8}>
            <Box
              style={{
                width: 42,
                height: 42,
                borderRadius: 999,
                background: "#e4effa",
                color: "#4b9ad2",
                display: "grid",
                placeItems: "center",
              }}
            >
              <factor.icon size={20} />
            </Box>
            <Text fw={700} c="#286292">
              {factor.title}
            </Text>
            <Text size="sm" c="#575757">
              {factor.text}
            </Text>
          </Stack>
        ))}
      </SimpleGrid>
    </Box>
  );
};
