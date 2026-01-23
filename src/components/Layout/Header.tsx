import { AppShell, Group, Title, Container, Button, Popover, Box, TextInput, ActionIcon, Image } from "@mantine/core";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CartIcon } from "../../modules/cart/views";
import { FavoritesIcon } from "../../modules/favorites/views/FavoritesIcon";
import { useGetAllCategories } from "../../modules/categories/hooks/useGetAllCategories";
import { IconChevronDown, IconSearch, IconUser } from "@tabler/icons-react";
import { useState } from "react";
import { headerAnimations, buttonAnimations } from "../../animations/animations";

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
      navigate({
        to: "/products",
      });
    }
  };

  return (
    <motion.div
      initial={headerAnimations.initial}
      animate={headerAnimations.animate}
      transition={headerAnimations.transition}
    >
      <AppShell.Header 
        style={{ 
          borderBottom: "1px solid #e0d4c4",
          backgroundColor: "#ffffff",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
        }}
      >
        <Container size="lg" h="100%">
          <Group justify="space-between" align="center" h="100%" gap="xl">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "8px" }}>
                <Image src="/logo.svg" alt="ShopHub Logo" h={40} w="auto" fit="contain" />
                <Title order={2} fw={600} c="brown.7" style={{ letterSpacing: "0.05em", fontFamily: '"Playfair Display", serif' }}>
                  ShopHub
                </Title>
              </Link>
            </motion.div>

          <Group gap="md" visibleFrom="md" style={{ flex: 1, maxWidth: 600 }}>
            <motion.div
              whileHover={buttonAnimations.hover}
              whileTap={buttonAnimations.tap}
            >
              <Button
                component={Link}
                to="/"
                variant={location.pathname === "/" ? "filled" : "subtle"}
                radius="sm"
                color="brown"
                style={{ 
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                }}
              >
                Home
              </Button>
            </motion.div>
            <motion.div
              whileHover={buttonAnimations.hover}
              whileTap={buttonAnimations.tap}
            >
              <Button
                component={Link}
                to="/products"
                variant={location.pathname === "/products" ? "filled" : "subtle"}
                radius="sm"
                color="brown"
                style={{ 
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                }}
              >
                Products
              </Button>
            </motion.div>
            
            <Popover
              width={600}
              position="bottom"
              withArrow
              shadow="md"
              opened={opened}
              onChange={setOpened}
            >
              <Popover.Target>
                <Button
                  variant="subtle"
                  radius="md"
                  rightSection={<IconChevronDown size={16} />}
                  onMouseEnter={() => setOpened(true)}
                  onMouseLeave={() => setOpened(false)}
                >
                  Categories
                </Button>
              </Popover.Target>
              <Popover.Dropdown
                onMouseEnter={() => setOpened(true)}
                onMouseLeave={() => setOpened(false)}
              >
                {isLoading ? (
                  <Box p="sm">Loading...</Box>
                ) : (
                  <Group gap="md" wrap="wrap">
                    {categories.map((category) => (
                      <Button
                        key={category.slug}
                        variant="subtle"
                        size="sm"
                        onClick={() => handleCategoryClick(category.slug)}
                        style={{ whiteSpace: "wrap" }}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </Group>
                )}
              </Popover.Dropdown>
            </Popover>

            <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: 300 }}>
              <TextInput
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                leftSection={<IconSearch size={18} />}
                rightSection={
                  <ActionIcon type="submit" variant="subtle">
                    <IconSearch size={18} />
                  </ActionIcon>
                }
                style={{ width: "100%" }}
              />
            </form>
          </Group>

          <Group gap="sm" style={{ overflow: "visible" }}>
            <ActionIcon variant="subtle" size="lg" radius="xl">
              <IconUser size={20} />
            </ActionIcon>
            <FavoritesIcon />
            <CartIcon />
          </Group>
        </Group>
      </Container>
    </AppShell.Header>
    </motion.div>
  );
};
