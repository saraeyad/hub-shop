import { AppShell, Box } from "@mantine/core";
import { Header } from "./Header";
import { Footer } from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "var(--page-bg)" }}>
      <AppShell header={{ height: 132 }} padding="0">
        <Header />
        <AppShell.Main style={{ flex: 1, padding: 0, paddingTop: 132, background: "var(--page-bg)" }}>
          {children}
        </AppShell.Main>
      </AppShell>
      <Footer />
    </Box>
  );
};
