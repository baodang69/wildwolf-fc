"use client";

import React from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  description: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    image: "/background/wildwolf_background.png",
    title: "WildWolf FC - Đam mê bóng đá",
    description: "Nơi hội tụ những tài năng trẻ và tinh thần thể thao cao",
  },
  {
    id: 2,
    image: "/logo-fc/wildwolf.jpeg",
    title: "Đội hình mạnh mẽ",
    description: "Những cầu thủ tài năng với kỹ thuật điêu luyện",
  },
  {
    id: 3,
    image: "/background/wildwolf_background.png",
    title: "Tinh thần chiến đấu",
    description: "Không bao giờ từ bỏ, luôn hướng tới chiến thắng",
  },
  {
    id: 4,
    image: "/logo-fc/wildwolf.jpeg",
    title: "Cộng đồng yêu bóng đá",
    description: "Kết nối những trái tim yêu bóng đá trên khắp mọi miền",
  },
  {
    id: 5,
    image: "/background/wildwolf_background.png",
    title: "Tương lai rực rỡ",
    description: "Hướng tới những mục tiêu cao hơn trong tương lai",
  },
];

export const HeroCarousel: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        mb: 0,
      }}
    >
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className="hero-swiper"
        style={{
          width: "100%",
          height: "auto",
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "60vh",
                overflow: "hidden",
                cursor: "pointer",
              }}
              className="carousel-box"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom CSS cho Swiper */}
      <style jsx global>{`
        .hero-swiper {
          position: relative;
          width: 100%;
          margin: 0 auto;
        }

        .hero-swiper .swiper-slide {
          width: 100%;
          height: auto;
        }

        .hero-swiper .swiper-slide img {
          transition: all 0.5s ease;
          border-radius: 12px;
          width: 100%;
          height: 100%; /* Cho ảnh full chiều cao Box chứa */
          object-fit: cover;
        }

        .hero-swiper .swiper-slide-active img {
          height: 500px;
          width: 100%;
        }

        .hero-swiper .swiper-slide:not(.swiper-slide-active) img {
          height: 350px;
        }

        /* Pagination Dots Styling */
        .hero-swiper .swiper-pagination {
          bottom: 15px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: auto !important;
          position: absolute !important;
          z-index: 10 !important;
        }

        .hero-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          margin: 0 6px;
          transition: all 0.3s ease;
          border: 2px solid rgba(255, 255, 255, 0.8);
        }

        .hero-swiper .swiper-pagination-bullet-active {
          background: #fff;
          transform: scale(1.2);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }

        .hero-swiper .swiper-pagination-bullet:hover {
          background: rgba(255, 255, 255, 0.8);
          transform: scale(1.1);
        }

        /* Fade effect enhancement */
        .hero-swiper .swiper-slide-active {
          z-index: 1;
        }
      `}</style>
    </Box>
  );
};
