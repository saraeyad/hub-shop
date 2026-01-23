import { Container, Grid, Stack, Text, Title, Group, Anchor, Divider, Box, TextInput, Button } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { IconMail, IconPhone, IconMapPin, IconBrandFacebook, IconBrandTwitter, IconBrandInstagram } from "@tabler/icons-react";
import { useState } from "react";
import toast from "react-hot-toast";

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success("Thank you for subscribing! Check your email for 10% off code.");
      setEmail("");
    }
  };

  return (
    <Box
      component="footer"
      style={{
        backgroundColor: "#2e2418",
        color: "#faf8f6",
        padding: "60px 0 30px",
        marginTop: "auto",
        borderTop: "1px solid #4d3d28",
      }}
    >
      <Container size="lg">
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Title order={3} c="white" fw={700}>
                ShopHub
              </Title>
              <Text size="sm" c="gray.5" style={{ lineHeight: 1.8 }}>
                Your one-stop destination for quality products. We bring you the best deals and latest trends.
              </Text>
              <Group gap="md" mt="md">
                <Anchor href="https://facebook.com" target="_blank" c="gray.5">
                  <IconBrandFacebook size={24} />
                </Anchor>
                <Anchor href="https://twitter.com" target="_blank" c="gray.5">
                  <IconBrandTwitter size={24} />
                </Anchor>
                <Anchor href="https://instagram.com" target="_blank" c="gray.5">
                  <IconBrandInstagram size={24} />
                </Anchor>
              </Group>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Title order={4} c="white" fw={600}>
                Newsletter
              </Title>
              <Text size="sm" c="gray.5">
                Get 10% off your first order! Subscribe to our newsletter for exclusive deals and updates.
              </Text>
              <form onSubmit={handleNewsletterSubmit}>
                <Group gap="xs">
                  <TextInput
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    style={{ flex: 1 }}
                    size="md"
                    type="email"
                  />
                  <Button type="submit" size="md" variant="filled" color="brown">
                    Subscribe
                  </Button>
                </Group>
              </form>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Title order={4} c="white" fw={600}>
                Quick Links
              </Title>
              <Stack gap="xs">
                <Anchor component={Link} to="/" c="gray.5" size="sm">
                  Home
                </Anchor>
                <Anchor component={Link} to="/products" c="gray.5" size="sm">
                  All Products
                </Anchor>
                <Anchor component={Link} to="/cart" c="gray.5" size="sm">
                  Shopping Cart
                </Anchor>
              </Stack>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Title order={4} c="white" fw={600}>
                Contact Us
              </Title>
              <Stack gap="md">
                <Group gap="sm">
                  <IconMail size={20} color="#868e96" />
                  <Text size="sm" c="gray.5">
                    support@shophub.com
                  </Text>
                </Group>
                <Group gap="sm">
                  <IconPhone size={20} color="#868e96" />
                  <Text size="sm" c="gray.5">
                    +1 (555) 123-4567
                  </Text>
                </Group>
                <Group gap="sm" align="flex-start">
                  <IconMapPin size={20} color="#868e96" style={{ marginTop: 4 }} />
                  <Text size="sm" c="gray.5">
                    123 Commerce Street<br />
                    New York, NY 10001<br />
                    United States
                  </Text>
                </Group>
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider my="xl" color="gray.8" />

        <Stack gap="md">
          <Box>
            <Text size="sm" c="gray.5" fw={600} mb="sm">
              We Accept:
            </Text>
            <Group gap="md">
              <Text size="xs" c="gray.6" style={{ 
                backgroundColor: "#fff", 
                padding: "8px 16px", 
                borderRadius: "4px",
                fontWeight: 600,
                color: "#1a1a1a"
              }}>
                VISA
              </Text>
              <Text size="xs" c="gray.6" style={{ 
                backgroundColor: "#fff", 
                padding: "8px 16px", 
                borderRadius: "4px",
                fontWeight: 600,
                color: "#1a1a1a"
              }}>
                Mastercard
              </Text>
              <Text size="xs" c="gray.6" style={{ 
                backgroundColor: "#fff", 
                padding: "8px 16px", 
                borderRadius: "4px",
                fontWeight: 600,
                color: "#1a1a1a"
              }}>
                PayPal
              </Text>
              <Text size="xs" c="gray.6" style={{ 
                backgroundColor: "#fff", 
                padding: "8px 16px", 
                borderRadius: "4px",
                fontWeight: 600,
                color: "#1a1a1a"
              }}>
                Amex
              </Text>
            </Group>
          </Box>

          <Group justify="space-between" align="center">
            <Text size="sm" c="gray.6">
              © 2024 ShopHub. All rights reserved.
            </Text>
            <Group gap="xl">
              <Anchor href="#" c="gray.6" size="sm">
                Privacy Policy
              </Anchor>
              <Anchor href="#" c="gray.6" size="sm">
                Terms of Service
              </Anchor>
            </Group>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
};
