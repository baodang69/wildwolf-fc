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

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/not-found";

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
        backgroundColor: "white",
        color: "rgb(31, 41, 55)",
      }}
    >
      {/* Global Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(75, 85, 99, 0.08) 20px, rgba(75, 85, 99, 0.08) 21px),
            repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(107, 114, 128, 0.06) 30px, rgba(107, 114, 128, 0.06) 31px),
            repeating-linear-gradient(60deg, transparent, transparent 40px, rgba(55, 65, 81, 0.05) 40px, rgba(55, 65, 81, 0.05) 41px),
            repeating-linear-gradient(150deg, transparent, transparent 35px, rgba(31, 41, 55, 0.04) 35px, rgba(31, 41, 55, 0.04) 36px)
          `,
        }}
      />

      <Header />
      <Box
        component="main"
        sx={{
          flex: 1,
          py: 4,
          position: "relative",
          zIndex: 10,
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};
