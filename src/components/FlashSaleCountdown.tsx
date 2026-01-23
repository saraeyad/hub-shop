import { Group, Text, Box } from "@mantine/core";
import { useState, useEffect } from "react";

type FlashSaleCountdownProps = {
  endTime: Date;
};

export const FlashSaleCountdown = ({ endTime }: FlashSaleCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const end = endTime.getTime();
      const difference = end - now;

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <Group gap="lg" justify="center">
      <Text size="sm" fw={600} c="gold.5">
        Ends in:
      </Text>
      <Box
        style={{
          backgroundColor: "#fff",
          padding: "4px 12px",
          borderRadius: "6px",
          border: "1px solid #e9ecef",
        }}
      >
        <Text size="sm" fw={700} c="dark">
          {String(timeLeft.hours).padStart(2, "0")}:
          {String(timeLeft.minutes).padStart(2, "0")}:
          {String(timeLeft.seconds).padStart(2, "0")}
        </Text>
      </Box>
    </Group>
  );
};
