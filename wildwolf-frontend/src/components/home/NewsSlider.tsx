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

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
}

const newsItems: NewsItem[] = [
  {
    id: 3,
    title: "Kế hoạch chuẩn bị cho mùa giải mới 2025",
    excerpt:
      "Ban huấn luyện đã vạch ra lộ trình chi tiết cho việc chuẩn bị mùa giải mới với nhiều hoạt động thú vị...",
    image: "/background/wildwolf_background.png",
    category: "Tin tức CLB",
    date: "2025-01-10",
    readTime: "4 phút đọc",
    author: "anc",
  },
  {
    id: 4,
    title: 'Chương trình từ thiện "Bóng đá vì cộng đồng" thành công tốt đẹp',
    excerpt:
      "WildWolf FC đã tổ chức thành công chương trình từ thiện giúp đỡ trẻ em có hoàn cảnh khó khăn...",
    image: "/logo-fc/wildwolf.jpeg",
    category: "Hoạt động xã hội",
    date: "2025-01-08",
    readTime: "3 phút đọc",
    author: "anc",
  },
  {
    id: 5,
    title: "Cập nhật tình hình chấn thương của các cầu thủ",
    excerpt:
      "Ban y tế câu lạc bộ đưa ra báo cáo chi tiết về tình trạng sức khỏe của các cầu thủ trước trận đấu quan trọng...",
    image: "/background/wildwolf_background.png",
    category: "Y tế thể thao",
    date: "2025-01-05",
    readTime: "2 phút đọc",
    author: "anc",
  },
  {
    id: 6,
    title: "Cập nhật tình hình chấn thương của các cầu thủ",
    excerpt:
      "Ban y tế câu lạc bộ đưa ra báo cáo chi tiết về tình trạng sức khỏe của các cầu thủ trước trận đấu quan trọng...",
    image: "/background/wildwolf_background.png",
    category: "Y tế thể thao",
    date: "2025-01-05",
    readTime: "2 phút đọc",
    author: "anc",
  },
  {
    id: 7,
    title: "Cập nhật tình hình chấn thương của các cầu thủ",
    excerpt:
      "Ban y tế câu lạc bộ đưa ra báo cáo chi tiết về tình trạng sức khỏe của các cầu thủ trước trận đấu quan trọng...",
    image: "/background/wildwolf_background.png",
    category: "Y tế thể thao",
    date: "2025-01-05",
    readTime: "2 phút đọc",
    author: "anc",
  },
];

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
          {newsItems.map((news) => (
            <SwiperSlide key={news.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  borderRadius: 3,
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: 180,
                    objectFit: "cover",
                  }}
                  image={news.image}
                  alt={news.title}
                />
                <CardContent
                  sx={{
                    flex: 1,
                    p: 2.5,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#059669",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {news.category}
                  </Typography>

                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      lineHeight: 1.3,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      fontSize: "1.1rem",
                      color: "#111827",
                    }}
                  >
                    {news.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      lineHeight: 1.5,
                      fontSize: "0.875rem",
                      color: "#6B7280",
                    }}
                  >
                    {news.excerpt}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      mt: "auto",
                      pt: 1,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: "#059669",
                      }}
                    >
                      {news.author.charAt(0)}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.875rem",
                          color: "#111827",
                        }}
                      >
                        {news.author}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          fontSize: "0.75rem",
                          color: "#6B7280",
                        }}
                      >
                        {new Date(news.date).toLocaleDateString("vi-VN")}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
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
