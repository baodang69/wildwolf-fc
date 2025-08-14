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
import { useAuth } from "../../contexts/AuthContext";
import { UserMenu } from "../auth/UserMenu";
import Link from "next/link";
import Image from "next/image";

export const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        backgroundColor: "white",
        color: "black",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Image
                src="/logo-fc/wildwolf.jpeg"
                alt="WildWolf FC Logo"
                width={40}
                height={40}
                style={{
                  borderRadius: "50%",
                }}
              />
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: 700, color: "black", ml: 1.5 }}
              >
                WildWolf FC
              </Typography>
            </Box>
          </Link>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {[
              { href: "/", label: "Trang chủ" },
              { href: "/members", label: "Thành viên" },
              { href: "/matches", label: "Trận đấu" },
              { href: "/blogs", label: "Tin tức" },
              { href: "/gallery", label: "Thư viện" },
              { href: "/contact", label: "Liên hệ" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ textDecoration: "none" }}
              >
                <Button
                  sx={{
                    color: "black",
                    position: "relative",
                    overflow: "hidden",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: "-100%",
                      width: "100%",
                      height: "2px",
                      backgroundColor: "black",
                      transition: "left 0.3s ease-in-out",
                    },
                    "&:hover::after": {
                      left: 0,
                    },
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {item.label}
                </Button>
              </Link>
            ))}

            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Link href="/login" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: "black",
                    color: "black",
                    position: "relative",
                    overflow: "hidden",
                    zIndex: 1,
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      backgroundColor: "black",
                      transition: "left 0.3s ease-in-out",
                      zIndex: -1,
                    },
                    "&:hover::before": {
                      left: 0,
                    },
                    "&:hover": {
                      color: "white",
                      borderColor: "black",
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
