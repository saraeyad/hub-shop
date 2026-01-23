import { Card, Text, Group, Box, useMantineTheme } from "@mantine/core";
import {
  IconTag,
  IconBrush,
  IconSofa,
  IconShoppingCart,
  IconShirt,
  IconShoe,
  IconClock,
  IconDeviceMobile,
  IconMotorbike,
  IconSparkles,
  IconCar,
  IconDiamond,
} from "@tabler/icons-react";
import type { Category } from "../entities/Category";

type CategoryCardProps = {
  category: Category;
};

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const theme = useMantineTheme();
  // Unified color for all category cards to keep the UI consistent
  const unifiedColor = theme.colors.brown[6];

  const getIcon = (slug: string) => {
    const props: { size: number; stroke: number; color: string } = {
      size: 40,
      stroke: 1.5,
      color: unifiedColor,
    };
    switch (slug) {
      case "beauty":
        return <IconBrush {...props} />;
      case "fragrances":
        return <IconSparkles {...props} />;
      case "furniture":
        return <IconSofa {...props} />;
      case "groceries":
      case "home-decoration":
        return <IconShoppingCart {...props} />;
      case "kitchen-accessories":
        return <IconShoppingCart {...props} />;
      case "laptops":
        return <IconDeviceMobile {...props} />;
      case "mens-shirts":
      case "tops":
        return <IconShirt {...props} />;
      case "mens-shoes":
      case "womens-shoes":
        return <IconShoe {...props} />;
      case "mens-watches":
      case "womens-watches":
        return <IconClock {...props} />;
      case "mobile-accessories":
      case "smartphones":
        return <IconDeviceMobile {...props} />;
      case "motorcycle":
        return <IconMotorbike {...props} />;
      case "skin-care":
        return <IconSparkles {...props} />;
      case "tablets":
        return <IconDeviceMobile {...props} />;
      case "vehicle":
        return <IconCar {...props} />;
      case "womens-bags":
        return <IconShoppingCart {...props} />;
      case "womens-dresses":
        return <IconDiamond {...props} />;
      default:
        return <IconTag {...props} />;
    }
  };
  const categoryIcon = getIcon(category.slug);

  return (
    <Card
      padding="sm"
      radius="md"
      withBorder
      style={{
        cursor: "pointer",
        transition: "all 0.3s ease",
        borderColor: `${unifiedColor}40`,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      styles={{
        root: {
          "&:hover": {
            transform: "translateY(-8px) scale(1.02)",
            borderColor: unifiedColor,
          },
        },
      }}
    >
      <Group
        gap="md"
        style={{
          width: "100%",
          flexDirection: "column",
        }}
      >
        <Box
          style={{
            fontSize: "2.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 36,
          }}
        >
          {categoryIcon}
        </Box>
        <Text
          fw={700}
          size="md"
          ta="center"
          style={{
            color: unifiedColor,
          }}
        >
          {category.displayName}
        </Text>
      </Group>
    </Card>
  );
};
