"use client";

import React from "react";
import { Box, Container, Typography, Link, Divider } from "@mui/material";
import { Sports, Email, Phone, LocationOn } from "@mui/icons-material";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#000000",
        color: "#ffffff",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 4,
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
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
                variant="h6"
                sx={{ fontWeight: 700, color: "#ffffff" }}
              >
                WildWolf FC
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "#cccccc", mb: 2 }}>
              Câu lạc bộ bóng đá WildWolf FC - Nơi hội tụ đam mê bóng đá. Chúng
              tôi cam kết mang đến những trận đấu hấp dẫn và tinh thần thể thao
              cao.
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mb: 2, color: "#ffffff" }}
            >
              Liên kết nhanh
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                href="/"
                color="inherit"
                underline="hover"
                sx={{ color: "#cccccc" }}
              >
                Trang chủ
              </Link>
              <Link
                href="/members"
                color="inherit"
                underline="hover"
                sx={{ color: "#cccccc" }}
              >
                Thành viên
              </Link>
              <Link
                href="/matches"
                color="inherit"
                underline="hover"
                sx={{ color: "#cccccc" }}
              >
                Trận đấu
              </Link>
              <Link
                href="/blogs"
                color="inherit"
                underline="hover"
                sx={{ color: "#cccccc" }}
              >
                Tin tức
              </Link>
              <Link
                href="/gallery"
                color="inherit"
                underline="hover"
                sx={{ color: "#cccccc" }}
              >
                Thư viện
              </Link>
              <Link
                href="/contact"
                color="inherit"
                underline="hover"
                sx={{ color: "#cccccc" }}
              >
                Liên hệ
              </Link>
            </Box>
          </Box>

          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mb: 2, color: "#ffffff" }}
            >
              Thông tin liên hệ
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Email sx={{ fontSize: 16, color: "#cccccc" }} />
                <Typography variant="body2" sx={{ color: "#cccccc" }}>
                  info@wildwolffc.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Phone sx={{ fontSize: 16, color: "#cccccc" }} />
                <Typography variant="body2" sx={{ color: "#cccccc" }}>
                  +84 123 456 789
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOn sx={{ fontSize: 16, color: "#cccccc" }} />
                <Typography variant="body2" sx={{ color: "#cccccc" }}>
                  Hà Nội, Việt Nam
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: "#333333" }} />

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "#cccccc" }}>
            © {new Date().getFullYear()} WildWolf FC. Tất cả quyền được bảo lưu.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
