"use client";

import React, { useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import { LoginForm } from "../../components/auth/LoginForm";
import { SignupForm } from "../../components/auth/SigninForm";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitchToSignup = () => {
    setIsLogin(false);
  };

  const handleSwitchToLogin = () => {
    setIsLogin(true);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          py: 4,
        }}
      >
        {isLogin ? (
          <LoginForm onSwitchToSignup={handleSwitchToSignup} />
        ) : (
          <SignupForm onSwitchToLogin={handleSwitchToLogin} />
        )}

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 WildWolf FC. Tất cả quyền được bảo lưu.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
