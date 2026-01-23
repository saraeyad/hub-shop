import {
  Container,
  Title,
  Loader,
  Text,
  Stack,
  Box,
  Center,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useGetAllCategories } from "../hooks/useGetAllCategories";
import { CategoryCard } from "./CategoryCard";

export const Categories = () => {
  const { categories, isEmpty, isLoading } = useGetAllCategories();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Stack align="center" gap="md">
          <Loader size="lg" type="dots" />
          <Text size="lg" c="dimmed">
            Loading categories...
          </Text>
        </Stack>
      </Center>
    );
  }

  if (isEmpty) {
    return (
      <Container size="md" py="xl">
        <Title order={2} ta="center">
          No categories available
        </Title>
      </Container>
    );
  }

  return (
    <Container size="lg" py="lg">
      <Stack gap="xl">
        <Box>
          <Title
            order={1}
            ta="center"
            mb="xs"
            style={{
              fontSize: "2rem",
              fontWeight: 900,
            }}
          >
            Explore Our Categories
          </Title>
          <Text ta="center" size="md" c="dimmed" mb="xl">
            Discover amazing products across all categories
          </Text>
        </Box>

        <Box>
          <Carousel
            slideSize={{ base: "100%", sm: "50%", md: "25%" }}
            slideGap="md"
            withControls
            controlSize={36}
            withIndicators={false}
            styles={{
              control: {
                "&[data-inactive]": {
                  opacity: 0,
                  cursor: "default",
                },
              },
            }}
          >
            {categories.map((category) => (
              <Carousel.Slide key={category.id}>
                <Box style={{ height: 150 }}>
                  <CategoryCard category={category} />
                </Box>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Box>
      </Stack>
    </Container>
  );
};
