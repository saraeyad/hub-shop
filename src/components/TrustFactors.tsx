import { Group, Text, Box } from "@mantine/core";
import { IconTruck, IconRotateClockwise, IconShieldLock } from "@tabler/icons-react";
import { motion } from "framer-motion";

const trustFactors = [
  {
    icon: IconTruck,
    text: "Free Shipping over $50",
    color: "brown",
  },
  {
    icon: IconRotateClockwise,
    text: "30-Day Easy Returns",
    color: "brown",
  },
  {
    icon: IconShieldLock,
    text: "Secure Payments",
    color: "brown",
  },
];

export const TrustFactors = () => {
  return (
    <Box
      style={{
        backgroundColor: "linear-gradient(135deg, #8b6f47 0%, #6d5638 100%)",
        padding: "20px 0",
        borderBottom: "1px solid #e0d4c4",
      }}
    >
      <Group justify="center" gap="xl" wrap="wrap">
        {trustFactors.map((factor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Group gap="sm">
              <factor.icon size={24} color={`var(--mantine-color-${factor.color}-6)`} />
              <Text size="sm" fw={500} c="dark">
                {factor.text}
              </Text>
            </Group>
          </motion.div>
        ))}
      </Group>
    </Box>
  );
};
