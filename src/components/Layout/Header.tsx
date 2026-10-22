import { AppShell, Group, Text, Container, Button, Popover, Box, TextInput, ActionIcon } from "@mantine/core";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { CartIcon } from "../../modules/cart/views";
import { FavoritesIcon } from "../../modules/favorites/views/FavoritesIcon";
import { useGetAllCategories } from "../../modules/categories/hooks/useGetAllCategories";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";
import { useState } from "react";

const navLinkStyle = (active: boolean) => ({
  color: active ? "#4c1d95" : "#575757",
  fontWeight: active ? 700 : 500,
  fontSize: "0.95rem",
  background: "transparent",
  borderBottom: active ? "2px solid #7c3aed" : "2px solid transparent",
  borderRadius: 0,
  paddingInline: 8,
});

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categories, isLoading } = useGetAllCategories();
  const [opened, setOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryClick = (categorySlug: string) => {
    navigate({
      to: "/products",
      search: { category: categorySlug },
    });
    setOpened(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/products" });
    }
  };

  const homeActive = location.pathname === "/";
  const productsActive = location.pathname.startsWith("/products");

  return (
    <AppShell.Header
      style={{
        background: "transparent",
        border: "none",
        boxShadow: "none",
      }}
    >
      <Container size="lg" h="100%" pt={16}>
        <Group
          justify="space-between"
          align="center"
          h={64}
          px="lg"
          wrap="nowrap"
          style={{
            background: "#ffffff",
            borderRadius: 999,
            border: "1px solid #ddd3f0",
            boxShadow: "0 8px 24px rgba(76, 29, 149, 0.10)",
          }}
        >
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <Box
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: "#7c3aed",
                color: "#fff",
                display: "grid",
                placeItems: "center",
                fontWeight: 700,
              }}
            >
              S
            </Box>
            <Text fw={700} c="#4c1d95" size="lg">
              ShopHub
            </Text>
          </Link>

          <Group gap="sm" visibleFrom="md" wrap="nowrap">
            <Button component={Link} to="/" variant="subtle" style={navLinkStyle(homeActive)}>
              Home
            </Button>
            <Button component={Link} to="/products" variant="subtle" style={navLinkStyle(productsActive)}>
              Products
            </Button>
            <Popover width={560} position="bottom" shadow="md" opened={opened} onChange={setOpened}>
              <Popover.Target>
                <Button
                  variant="subtle"
                  rightSection={<IconChevronDown size={16} />}
                  style={navLinkStyle(false)}
                  onMouseEnter={() => setOpened(true)}
                  onMouseLeave={() => setOpened(false)}
                >
                  Categories
                </Button>
              </Popover.Target>
              <Popover.Dropdown onMouseEnter={() => setOpened(true)} onMouseLeave={() => setOpened(false)}>
                {isLoading ? (
                  <Box p="sm">Loading...</Box>
                ) : (
                  <Group gap="xs" wrap="wrap">
                    {categories.map((category) => (
                      <Button
                        key={category.slug}
                        variant="light"
                        color="brand"
                        size="xs"
                        radius="xl"
                        onClick={() => handleCategoryClick(category.slug)}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </Group>
                )}
              </Popover.Dropdown>
            </Popover>
          </Group>

          <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
            <Box component="form" onSubmit={handleSearch} w={220} visibleFrom="sm">
              <TextInput
                placeholder="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                leftSection={<IconSearch size={16} />}
                size="sm"
              />
            </Box>
            <ActionIcon
              variant="subtle"
              size="lg"
              radius="xl"
              aria-label="Search"
              hiddenFrom="sm"
              onClick={() => navigate({ to: "/products" })}
            >
              <IconSearch size={18} color="#4c1d95" />
            </ActionIcon>
            <FavoritesIcon />
            <CartIcon />
          </Group>
        </Group>
      </Container>
    </AppShell.Header>
  );
};
