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
          <Title order={2} ta="center" mb={6} c="#286292">
            Browse by category
          </Title>
          <Box mx="auto" mb="md" style={{ width: 56, height: 2, background: "#4b9ad2" }} />
          <Text ta="center" size="md" c="#575757" mb="xl">
            Jump into a shelf without scrolling the whole catalog.
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
