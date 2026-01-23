import {
  Container,
  Title,
  Stack,
  Paper,
  Group,
  Text,
  Divider,
  Button,
  TextInput,
  Grid,
  Badge,
  Card,
  Image,
  Box,
} from "@mantine/core";
import { Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "../../cart/hooks/useCart";
import { useCheckout } from "../hooks/useCheckout";
import { useState } from "react";
import toast from "react-hot-toast";

export const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const { createOrder, isProcessing } = useCheckout();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.items.length === 0) {
      toast.error("Your cart is empty");
      navigate({ to: "/cart" });
      return;
    }

    try {
      await createOrder({
        items: cart.items.map(item => ({
          productId: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          discountPercentage: item.discountPercentage,
        })),
        shippingInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        paymentInfo: {
          method: "card",
        },
        totals: {
          subtotal: cart.subtotal,
          tax: cart.tax,
          shipping: cart.shipping,
          total: cart.total,
        },
      });
      
      toast.success("Order placed successfully!");
      clearCart();
      navigate({ to: "/" });
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  if (cart.items.length === 0) {
    return (
      <Container size="lg" py="xl">
        <Stack align="center" gap="xl" style={{ minHeight: "60vh", justifyContent: "center" }}>
          <Title order={2}>Your cart is empty</Title>
          <Text size="lg" c="dimmed" ta="center">
            Please add items to your cart before checkout.
          </Text>
          <Button component={Link} to="/products" size="lg" mt="md">
            Continue Shopping
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Box
      style={{
        background: "linear-gradient(135deg, #8b6f47 0%, #6d5638 100%)",
        padding: "40px 0 60px",
        minHeight: "100vh",
      }}
    >
      <Container size="lg">
        <Title order={1} mb="xl" c="white">
          Checkout
        </Title>

        <form onSubmit={handleSubmit}>
          <Grid gutter="lg">
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Stack gap="lg">
                <Paper p="lg" radius="md" withBorder>
                  <Title order={3} mb="md">
                    Shipping Information
                  </Title>
                  <Divider mb="md" />

                  <Grid gutter="md">
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="First Name"
                        placeholder="John"
                        required
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="Last Name"
                        placeholder="Doe"
                        required
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12 }}>
                      <TextInput
                        label="Email"
                        type="email"
                        placeholder="john.doe@example.com"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12 }}>
                      <TextInput
                        label="Phone"
                        placeholder="+1 234 567 8900"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12 }}>
                      <TextInput
                        label="Address"
                        placeholder="123 Main Street"
                        required
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="City"
                        placeholder="New York"
                        required
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="ZIP Code"
                        placeholder="10001"
                        required
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12 }}>
                      <TextInput
                        label="Country"
                        placeholder="United States"
                        required
                        value={formData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                      />
                    </Grid.Col>
                  </Grid>
                </Paper>

                <Paper p="lg" radius="md" withBorder>
                  <Title order={3} mb="md">
                    Payment Method
                  </Title>
                  <Divider mb="md" />
                  <Text size="sm" c="dimmed">
                    Payment method selection will be implemented based on your payment provider.
                  </Text>
                </Paper>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 5 }}>
              <Paper p="xl" radius="md" withBorder shadow="sm" style={{ position: "sticky", top: 80, backgroundColor: "#faf8f6" }}>
                <Stack gap="md">
                  <Title order={3} mb="xs">
                    Order Summary
                  </Title>
                  <Divider />

                  <Stack gap="sm">
                    {cart.items.map((item) => {
                      const itemPrice = item.discountPercentage
                        ? item.price * (1 - item.discountPercentage / 100)
                        : item.price;
                      const itemTotal = itemPrice * item.quantity;

                      return (
                        <Card key={item.productId} p="sm" withBorder radius="md">
                          <Group gap="sm" wrap="nowrap">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={20}
                              height={100}
                              fit="contain"
                              radius="md"
                            />
                            <Box>
                              <Text size="sm" fw={500} lineClamp={1}>
                                {item.name}
                              </Text>
                              <Group gap="xs" mt={4}>
                                <Text size="xs" c="dimmed">
                                  Qty: {item.quantity}
                                </Text>
                                {item.discountPercentage && (
                                  <Badge color="gold" size="xs" variant="light">
                                    {item.discountPercentage}% OFF
                                  </Badge>
                                )}
                              </Group>
                              <Text size="sm" fw={600} c="gold.5" mt={4}>
                                ${itemTotal.toFixed(2)}
                              </Text>
                            </Box>
                          </Group>
                        </Card>
                      );
                    })}
                  </Stack>

                  <Divider />

                  <Stack gap="sm">
                    <Group justify="space-between">
                      <Text size="sm" c="dimmed">
                        Subtotal ({cart.items.length} items)
                      </Text>
                      <Text size="sm" fw={500}>
                        ${cart.subtotal.toFixed(2)}
                      </Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm" c="dimmed">
                        Tax
                      </Text>
                      <Text size="sm" fw={500}>
                        ${cart.tax.toFixed(2)}
                      </Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm" c="dimmed">
                        Shipping
                      </Text>
                      <Text size="sm" fw={500}>
                        ${cart.shipping.toFixed(2)}
                      </Text>
                    </Group>
                  </Stack>

                  <Divider />

                  <Group justify="space-between" mb="md">
                    <Text size="lg" fw={700}>
                      Total
                    </Text>
                    <Text size="xl" fw={700} c="gold.5">
                      ${cart.total.toFixed(2)}
                    </Text>
                  </Group>

                  <Button
                    type="submit"
                    size="lg"
                    fullWidth
                    loading={isProcessing}
                    disabled={cart.items.length === 0}
                  >
                    {isProcessing ? "Processing..." : "Place Order"}
                  </Button>

                  <Button variant="light" component={Link} to="/cart" fullWidth>
                    Back to Cart
                  </Button>
                </Stack>
              </Paper>
            </Grid.Col>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};
