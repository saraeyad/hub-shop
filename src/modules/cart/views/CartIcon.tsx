import { ActionIcon, Badge } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { useCart } from "../hooks/useCart";
import { Link } from "@tanstack/react-router";

export const CartIcon = () => {
  const { cart } = useCart();

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ActionIcon
      component={Link}
      to="/cart"
      variant="subtle"
      size="lg"
      radius="xl"
      style={{ position: "relative", overflow: "visible" }}
    >
      <IconShoppingCart size={20} />
      {itemCount > 0 && (
        <Badge
          size="xs"
          color="red"
          variant="filled"
          style={{
            position: "absolute",
            top: -4,
            right: -4,
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
          {itemCount > 99 ? "99+" : itemCount}
        </Badge>
      )}
    </ActionIcon>
  );
};
