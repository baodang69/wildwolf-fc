"use client";

import React from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

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
      }}
    >
      <Box sx={{ width: "100%", mx: "auto", px: 0 }}>
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          navigation={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Navigation, Autoplay]}
          className="hero-swiper"
          style={{
            paddingTop: "20px",
            paddingBottom: "20px",
            width: "100%",
          }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "600px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
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
      </Box>

      {/* Custom CSS cho Swiper */}
      <style jsx global>{`
        .hero-swiper {
          position: relative;
        }

        .hero-swiper .swiper-slide {
          transition: all 0.3s ease;
        }

        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: #fff;
          background: rgba(0, 0, 0, 0.5);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-top: -25px;
          transition: all 0.3s ease;
        }

        .hero-swiper .swiper-button-next:hover,
        .hero-swiper .swiper-button-prev:hover {
          background: rgba(0, 0, 0, 0.8);
          transform: scale(1.1);
        }

        .hero-swiper .swiper-button-next::after,
        .hero-swiper .swiper-button-prev::after {
          font-size: 18px;
          font-weight: bold;
        }

        .hero-swiper .swiper-button-next {
          right: 20px;
        }

        .hero-swiper .swiper-button-prev {
          left: 20px;
        }
      `}</style>
    </Box>
  );
};
