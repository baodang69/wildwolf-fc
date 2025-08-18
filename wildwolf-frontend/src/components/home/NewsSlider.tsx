"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Avatar,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Article, ArrowForward } from "@mui/icons-material";
import Link from "next/link";
import { BlogCard } from "../blog/BlogCard";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { width } from "@mui/system";

const blogs = [
  {
    _id: "1",
    content: "Đây là nội dung",
    summary: "Đây là summary",
    title: "Đây là tiêu đề",
    author: {
      _id: "1",
      fullname: "ádasd",
      avatar: "/logo-fc/wildwolf.jpeg",
    },
    createdAt: "2024-12-31T17:00:00.000Z",
    like: 0,
    coverImage: "/logo-fc/wildwolf.jpeg",
    slug: "day-la-noi-dung",
    tags: ["Bóng đá", "Thể thao"],
    hot: false,
  },
  {
    _id: "2",
    content: "Đây là nội dung",
    summary: "Đây là summary",
    title: "Đây là tiêu đề",
    author: {
      _id: "1",
      fullname: "ádasd",
      avatar: "/logo-fc/wildwolf.jpeg",
    },
    createdAt: "2024-12-31T17:00:00.000Z",
    like: 0,
    coverImage: "/logo-fc/wildwolf.jpeg",
    slug: "day-la-noi-dung",
    tags: ["Bóng đá", "Thể thao"],
    hot: false,
  },
  {
    _id: "3",
    content: "Đây là nội dung",
    summary: "Đây là summary",
    title: "Đây là tiêu đề",
    author: {
      _id: "1",
      fullname: "ádasd",
      avatar: "/logo-fc/wildwolf.jpeg",
    },
    createdAt: "2024-12-31T17:00:00.000Z",
    like: 0,
    coverImage: "/logo-fc/wildwolf.jpeg",
    slug: "day-la-noi-dung",
    tags: ["Bóng đá", "Thể thao"],
    hot: false,
  },
  {
    _id: "4",
    content: "Đây là nội dung",
    summary: "Đây là summary",
    title: "Đây là tiêu đề",
    author: {
      _id: "1",
      fullname: "ádasd",
      avatar: "/logo-fc/wildwolf.jpeg",
    },
    createdAt: "2024-12-31T17:00:00.000Z",
    like: 0,
    coverImage: "/logo-fc/wildwolf.jpeg",
    slug: "day-la-noi-dung",
    tags: ["Bóng đá", "Thể thao"],
    hot: false,
  },
  {
    _id: "5",
    content: "Đây là nội dung",
    summary: "Đây là summary",
    title: "Đây là tiêu đề",
    author: {
      _id: "1",
      fullname: "ádasd",
      avatar: "/logo-fc/wildwolf.jpeg",
    },
    createdAt: "2024-12-31T17:00:00.000Z",
    like: 0,
    coverImage: "/logo-fc/wildwolf.jpeg",
    slug: "day-la-noi-dung",
    tags: ["Bóng đá", "Thể thao"],
    hot: false,
  },
];

const size = {
  height: "420px",
  width: "300px",
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Kết quả trận đấu":
      return "success";
    case "Chuyển nhượng":
      return "primary";
    case "Tin tức CLB":
      return "info";
    case "Hoạt động xã hội":
      return "warning";
    case "Y tế thể thao":
      return "error";
    default:
      return "default";
  }
};

export const NewsSlider: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "left", mb: 3 }}>
        <Link href="/blogs">
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "#000",
              position: "relative",
              display: "inline-block",
              cursor: "pointer",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "0%",
                height: "2px",
                backgroundColor: "black",
                transition: "width 0.3s ease-in-out",
              },
              "&:hover::after": {
                width: "100%",
              },
            }}
          >
            Tin Tức & Hoạt Động
          </Typography>
        </Link>
        <Typography variant="body1" color="text.secondary">
          Những thông tin mới nhất về WildWolf FC
        </Typography>
      </Box>

      <Box sx={{ position: "relative" }}>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Navigation, Autoplay]}
          className="news-swiper"
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {blogs.map((bl) => (
            <SwiperSlide key={bl._id} style={{ alignSelf: "flex-start" }}>
              <BlogCard blog={bl} size={size}></BlogCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Custom CSS cho News Swiper */}
      <style jsx global>{`
        .news-swiper .swiper-button-next,
        .news-swiper .swiper-button-prev {
          color: #1976d2;
          background: rgba(255, 255, 255, 0.9);
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin-top: -17px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        .news-swiper .swiper-button-next:hover,
        .news-swiper .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 1);
          transform: scale(1.1);
        }

        .news-swiper .swiper-button-next::after,
        .news-swiper .swiper-button-prev::after {
          font-size: 14px;
          font-weight: bold;
        }
      `}</style>
    </Container>
  );
};
