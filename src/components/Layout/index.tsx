import { AppShell, Box } from "@mantine/core";
import { useLocation } from "@tanstack/react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
};

const HEADER_HEIGHT = 128;

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const overlay = location.pathname === "/";

  return (
    <Box style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "var(--page-bg)" }}>
      <AppShell header={{ height: HEADER_HEIGHT }} padding={0} withBorder={false}>
        <Header />
        <AppShell.Main
          style={{
            flex: 1,
            padding: 0,
            paddingTop: overlay ? 0 : HEADER_HEIGHT,
            background: "var(--page-bg)",
          }}
        >
          {children}
        </AppShell.Main>
      </AppShell>
      <Footer />
    </Box>
  );
};
