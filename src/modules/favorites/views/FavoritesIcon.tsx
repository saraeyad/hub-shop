import { ActionIcon, Badge, Popover, Stack, Group, Image, Text, Button, Box } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import { useFavorites } from "../hooks/useFavorites";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export const FavoritesIcon = () => {
  const { getAll, removeItem } = useFavorites();
  const [opened, setOpened] = useState(false);
  const favorites = getAll();
  const navigate = useNavigate();

  const items = favorites.items;
  const count = items.length;

  const handleRemove = (productId: number) => {
    removeItem(productId);
  };

  return (
    <Popover
      width={350}
      position="bottom-end"
      withArrow
      shadow="sm"
      opened={opened}
      onChange={setOpened}
    >
      <Popover.Target>
        <ActionIcon
          variant="subtle"
          size="lg"
          radius="xl"
          onClick={() => setOpened(!opened)}
          style={{ position: "relative", overflow: "visible" }}
        >
          <IconHeart size={20} color="#6d5638" />
          {count > 0 && (
            <Badge
              size="xs"
              color="red"
              variant="filled"
              style={{
                position: "absolute",
                top: -4,
                right: -6,
                minWidth: 18,
                height: 18,
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 700,
                backgroundColor: "var(--mantine-color-red-6)",
                border: "none",
                zIndex: 10,
              }}
            >
              {count > 99 ? "99+" : count}
            </Badge>
          )}
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack gap="xs">
          <Text fw={600} size="lg">
            Favorites ({count})
          </Text>
          {items.length === 0 ? (
            <Box py="xl">
              <Text ta="center" c="dimmed" size="sm">
                No favorites yet. Start adding products you love!
              </Text>
            </Box>
          ) : (
            <Stack gap="sm" style={{ maxHeight: 400, overflowY: "auto" }}>
              {items.map((item) => (
                <Group key={item.productId} gap="sm">
                                  <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                    <Text
                      fw={500}
                      size="sm"
                      lineClamp={2}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate({
                          to: "/products/$productId",
                          params: { productId: String(item.productId) },
                        });
                        setOpened(false);
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text size="xs" c="dimmed">
                      ${item.price.toFixed(2)}
                    </Text>
                  </Stack>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={20}
                    height={100}
                    fit="contain"
                    radius="sm"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate({
                        to: "/products/$productId",
                        params: { productId: String(item.productId) },
                      });
                      setOpened(false);
                    }}
                  />
  
                  <Button
                    variant="subtle"
                    color="red"
                    size="sm"
                    onClick={() => handleRemove(item.productId)}
                  >
                    Remove
                  </Button>
                </Group>
              ))}
            </Stack>
          )}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};
