"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { Sports } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { UserMenu } from "../auth/UserMenu";
import Link from "next/link";

export const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <AppBar position="static" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Sports />
              <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
                WildWolf FC
              </Typography>
            </Box>
          </Link>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Button color="inherit">Trang chủ</Button>
            </Link>
            <Link href="/members" style={{ textDecoration: "none" }}>
              <Button color="inherit">Thành viên</Button>
            </Link>
            <Link href="/matches" style={{ textDecoration: "none" }}>
              <Button color="inherit">Trận đấu</Button>
            </Link>
            <Link href="/blogs" style={{ textDecoration: "none" }}>
              <Button color="inherit">Tin tức</Button>
            </Link>
            <Link href="/gallery" style={{ textDecoration: "none" }}>
              <Button color="inherit">Thư viện</Button>
            </Link>
            <Link href="/contact" style={{ textDecoration: "none" }}>
              <Button color="inherit">Liên hệ</Button>
            </Link>

            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Link href="/login" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: "currentColor",
                    color: "inherit",
                    "&:hover": {
                      borderColor: "currentColor",
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  Đăng nhập
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
