"use client";

import React from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { Sports, Group, CalendarToday, Article } from "@mui/icons-material";
import Link from "next/link";
import { HeroCarousel } from "../components/home/HeroCarousel";
import { MatchSchedule } from "../components/home/MatchSchedule";
import { NewsSlider } from "../components/home/BlogSlider";
import { relative } from "path";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <Container maxWidth="lg">
      {isAuthenticated ? (
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            Chào mừng trở lại, {user?.fullname}!
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                      Thông tin cá nhân
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Email: {user?.email}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Vai trò: {user?.role}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                      Hoạt động gần đây
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Chưa có hoạt động nào được ghi nhận.
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>

            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Thông báo
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Chào mừng bạn đến với hệ thống quản lý WildWolf FC!
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      ) : (
        <Box>
          <Container maxWidth="lg">
            <h1>Trang chủ</h1>
            {/* Hero Carousel */}
            <HeroCarousel />
          </Container>

          {/* Match Schedule Section */}
          <MatchSchedule />

          {/* News Section */}
          <NewsSlider />
        </Box>
      )}
    </Container>
  );
}
