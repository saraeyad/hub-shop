import { AppShell, Group, Text, Box, TextInput } from "@mantine/core";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { CartIcon } from "../../modules/cart/views";
import { FavoritesIcon } from "../../modules/favorites/views/FavoritesIcon";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";

type NavItem =
  | { label: string; to: "/products" }
  | { label: string; category: string };

const NAV: NavItem[] = [
  { label: "New arrivals", to: "/products" },
  { label: "Beauty", category: "beauty" },
  { label: "Fragrances", category: "fragrances" },
  { label: "Dresses", category: "womens-dresses" },
  { label: "Shoes", category: "womens-shoes" },
  { label: "Bags", category: "womens-bags" },
  { label: "Jewelry", category: "womens-jewellery" },
  { label: "Watches", category: "womens-watches" },
  { label: "Sunglasses", category: "sunglasses" },
  { label: "Skin care", category: "skin-care" },
];

function categoryFromSearch(search: unknown): string | undefined {
  if (search && typeof search === "object" && "category" in search) {
    const value = (search as { category?: unknown }).category;
    return typeof value === "string" ? value : undefined;
  }
  return undefined;
}

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const onHome = location.pathname === "/";
  const solid = !onHome || scrolled;
  const ink = solid ? "#171717" : "#ffffff";
  const category = categoryFromSearch(location.search);

  useEffect(() => {
    if (!onHome) return;
    const update = () => {
      const hero = window.innerWidth >= 992 ? 640 : 460;
      setScrolled(window.scrollY > hero - 140);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [onHome]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate({ to: "/products" });
  };

  const itemStyle = (active: boolean) => ({
    color: ink,
    fontSize: 11,
    letterSpacing: "0.16em",
    textTransform: "uppercase" as const,
    textDecoration: "none",
    fontWeight: 500,
    whiteSpace: "nowrap" as const,
    border: "none",
    borderBottom: active ? `1px solid ${ink}` : "1px solid transparent",
    padding: 0,
    paddingBottom: 3,
    fontFamily: "inherit",
    textShadow: solid ? "none" : "0 1px 8px rgba(0,0,0,0.45)",
    background: "none",
    cursor: "pointer",
  });

  return (
    <AppShell.Header
      style={{
        height: 128,
        background: solid ? "rgba(255,255,255,0.96)" : "transparent",
        borderBottom: solid ? "1px solid #ececec" : "none",
        transition: "background 0.25s ease, border-color 0.25s ease",
        backdropFilter: solid ? "blur(8px)" : "none",
      }}
    >
      <Group
        justify="space-between"
        align="center"
        px={{ base: 16, md: 28 }}
        h={62}
        wrap="nowrap"
        style={{ position: "relative" }}
      >
        <Box component="form" onSubmit={handleSearch} w={{ base: 132, sm: 180 }} className="header-search">
          <TextInput
            variant="unstyled"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            leftSection={<IconSearch size={16} stroke={1.4} color={ink} />}
            styles={{
              input: {
                background: "transparent",
                color: ink,
                borderBottom: `1px solid ${solid ? "#171717" : "rgba(255,255,255,0.9)"}`,
                borderRadius: 0,
                fontSize: 14,
                "--input-placeholder-color": solid ? "#8a8a8a" : "rgba(255,255,255,0.92)",
              },
            }}
          />
        </Box>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Text
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 32,
              lineHeight: 1,
              color: ink,
              fontWeight: 500,
              textShadow: solid ? "none" : "0 1px 10px rgba(0,0,0,0.4)",
            }}
          >
            ShopHub
          </Text>
        </Link>
        <Group gap={2} wrap="nowrap">
          <FavoritesIcon color={ink} />
          <CartIcon color={ink} />
        </Group>
      </Group>
      <Group
        justify="space-between"
        gap={18}
        px={{ base: 16, md: 28 }}
        wrap="nowrap"
        className="header-nav"
        mt={14}
        pb={6}
        style={{ overflowX: "auto" }}
      >
        {NAV.map((item) => {
          const active =
            "to" in item
              ? location.pathname === "/products" && !category
              : category === item.category;
          if ("to" in item) {
            return (
              <Link key={item.label} to={item.to} style={itemStyle(active)}>
                {item.label}
              </Link>
            );
          }
          return (
            <Text
              key={item.label}
              component="button"
              onClick={() => navigate({ to: "/products", search: { category: item.category } })}
              style={itemStyle(active)}
            >
              {item.label}
            </Text>
          );
        })}
      </Group>
    </AppShell.Header>
  );
};
