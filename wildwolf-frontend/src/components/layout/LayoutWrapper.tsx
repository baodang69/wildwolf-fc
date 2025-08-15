"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Box } from "@mui/material";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const pathname = usePathname();

  // Ẩn Header/Footer trên trang login và signup
  const isAuthPage =
    pathname === "/login" || pathname === "/signup" || pathname === "/not-found";

  if (isAuthPage) {
    // Chỉ render children mà không có Header/Footer
    return <>{children}</>;
  }

  // Render với Header/Footer cho các trang khác
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flex: 1,
          py: 4,
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};
