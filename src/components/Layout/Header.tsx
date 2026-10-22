import { AppShell, Group, Text, Box, TextInput, Popover, Button } from "@mantine/core";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { CartIcon } from "../../modules/cart/views";
import { FavoritesIcon } from "../../modules/favorites/views/FavoritesIcon";
import { useGetAllCategories } from "../../modules/categories/hooks/useGetAllCategories";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

const linkStyle = (active: boolean) => ({
  color: active ? "#111111" : "#3a3a3a",
  fontSize: 11,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  textDecoration: "none",
  fontWeight: 500,
  whiteSpace: "nowrap" as const,
  borderBottom: active ? "1px solid #111" : "1px solid transparent",
  paddingBottom: 2,
});

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categories, isLoading } = useGetAllCategories();
  const [opened, setOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate({ to: "/products" });
  };

  const homeActive = location.pathname === "/";
  const productsActive = location.pathname.startsWith("/products");

  return (
    <AppShell.Header style={{ background: "#ffffff", borderBottom: "1px solid #ececec" }}>
      <Box ta="center" py={6} style={{ background: "#f7f5f2", fontSize: 12, letterSpacing: "0.04em" }}>
        Complimentary delivery over $50
      </Box>
      <Group justify="space-between" align="center" px={{ base: "md", md: 36 }} h={64} wrap="nowrap" style={{ position: "relative" }}>
        <Box component="form" onSubmit={handleSearch} w={180} visibleFrom="sm">
          <TextInput
            variant="unstyled"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            leftSection={<IconSearch size={16} stroke={1.4} />}
            styles={{
              input: {
                borderBottom: "1px solid #111",
                borderRadius: 0,
                fontSize: 14,
              },
            }}
          />
        </Box>
        <Box hiddenFrom="sm" w={24} />
        <Link to="/" style={{ textDecoration: "none", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <Text
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 30,
              lineHeight: 1,
              color: "#111",
              fontWeight: 500,
            }}
          >
            ShopHub
          </Text>
        </Link>
        <Group gap={4} wrap="nowrap">
          <FavoritesIcon />
          <CartIcon />
        </Group>
      </Group>
      <Group justify="center" gap={22} px="md" pb={10} wrap="nowrap" style={{ overflowX: "auto" }}>
        <Link to="/" style={linkStyle(homeActive)}>Home</Link>
        <Link to="/products" style={linkStyle(productsActive)}>New arrivals</Link>
        <Popover opened={opened} onChange={setOpened} position="bottom" width={520} shadow="xs">
          <Popover.Target>
            <Text
              component="button"
              onClick={() => setOpened((value) => !value)}
              style={{ ...linkStyle(false), background: "none", border: "none", cursor: "pointer" }}
            >
              Categories
            </Text>
          </Popover.Target>
          <Popover.Dropdown>
            {isLoading ? (
              <Text size="sm">Loading</Text>
            ) : (
              <Group gap="xs">
                {categories.map((category) => (
                  <Button
                    key={category.slug}
                    variant="subtle"
                    color="brand"
                    size="xs"
                    onClick={() => {
                      navigate({ to: "/products", search: { category: category.slug } });
                      setOpened(false);
                    }}
                  >
                    {category.name}
                  </Button>
                ))}
              </Group>
            )}
          </Popover.Dropdown>
        </Popover>
      </Group>
    </AppShell.Header>
  );
};
