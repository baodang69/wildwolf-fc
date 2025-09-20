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
    </Container>
  );
}
