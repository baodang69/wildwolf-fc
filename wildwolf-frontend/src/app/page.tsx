import React from "react";
import { Container, Box } from "@mui/material";
import { HeroCarousel } from "../components/home/HeroCarousel";
import { MatchSchedule } from "../components/home/MatchSchedule";
import { NewsSlider } from "../components/home/BlogSlider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WildWolf FC - Official Homepage",
  description:
    "Welcome to WildWolf FC, the official homepage for news, match schedules and club updates.",
  icons: {
    icon: "/favicon/favicon.ico",
  },
  openGraph: {
    title: "WildWolf FC - Official Homepage",
    description:
      "Stay updated with the latest news and matches from WildWolf FC.",
    url: "https://wildwolffc.com",
    siteName: "WildWolf FC",
    images: [
      {
        url: "https://res.cloudinary.com/dqxzklfzz/image/upload/v1759171454/wildwolf_yjylpx.jpg",
        width: 1200,
        height: 630,
        alt: "WildWolf FC Logo",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function Home() {
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
