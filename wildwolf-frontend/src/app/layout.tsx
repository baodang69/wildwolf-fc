import type { Metadata } from "next";
import { AuthProvider } from "../contexts/AuthContext";
import { ThemeProvider } from "../components/providers/ThemeProvider";
import { LayoutWrapper } from "../components/layout/LayoutWrapper";

export const metadata: Metadata = {
  title: "WildWolf FC",
  description: "Trang web chính thức của câu lạc bộ bóng đá WildWolf FC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <ThemeProvider>
          <AuthProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
