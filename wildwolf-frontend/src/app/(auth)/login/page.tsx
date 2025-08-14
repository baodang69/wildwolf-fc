"use client";

import React from "react";
import { Box } from "@mui/material";
import { LoginForm } from "../../../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)),
          url('/background/wildwolf_background.png')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <LoginForm />
    </Box>
  );
}
