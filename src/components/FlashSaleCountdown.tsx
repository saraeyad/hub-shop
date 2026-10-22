import { Group, Text, Box } from "@mantine/core";
import { useState, useEffect } from "react";

type FlashSaleCountdownProps = {
  endTime: Date;
};

export const FlashSaleCountdown = ({ endTime }: FlashSaleCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime.getTime() - Date.now();
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

  const chips = [
    String(timeLeft.hours).padStart(2, "0"),
    String(timeLeft.minutes).padStart(2, "0"),
    String(timeLeft.seconds).padStart(2, "0"),
  ];

  return (
    <Group gap="sm" justify="center">
      <Text size="sm" fw={600} c="#286292">
        Ends in
      </Text>
      {chips.map((value, index) => (
        <Box
          key={index}
          px={12}
          py={6}
          style={{ background: "#ffffff", borderRadius: 12, border: "1px solid #d7e6f2", minWidth: 48, textAlign: "center" }}
        >
          <Text fw={700} c="#286292">
            {value}
          </Text>
        </Box>
      ))}
    </Group>
  );
};
