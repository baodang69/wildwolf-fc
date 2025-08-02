"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Sports } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { UserMenu } from "../auth/UserMenu";
import { useRouter } from "next/navigation";

export const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/auth");
  };

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <Sports sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          WildWolf FC
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <Button
              color="inherit"
              onClick={handleLoginClick}
              variant="outlined"
              sx={{
                borderColor: "white",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Đăng nhập
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
