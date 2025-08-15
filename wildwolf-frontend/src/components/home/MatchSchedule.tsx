"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Avatar,
} from "@mui/material";
import {
  CalendarToday,
  LocationOn,
  AccessTime,
  Sports,
} from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  date: string;
  time: string;
  venue: string;
  status: "upcoming" | "live" | "finished";
  score?: string;
}

const upcomingMatches: Match[] = [
  {
    id: 1,
    homeTeam: "WildWolf FC",
    awayTeam: "Thunder United",
    homeTeamLogo: "/logo-fc/wildwolf.jpeg",
    awayTeamLogo: "/logo-fc/wildwolf.jpeg",
    date: "2025-01-20",
    time: "19:00",
    venue: "Sân vận động Quốc gia",
    status: "upcoming",
  },
  {
    id: 2,
    homeTeam: "Lightning FC",
    awayTeam: "WildWolf FC",
    homeTeamLogo: "/logo-fc/wildwolf.jpeg",
    awayTeamLogo: "/logo-fc/wildwolf.jpeg",
    date: "2025-01-25",
    time: "15:30",
    venue: "Sân Lightning Arena",
    status: "upcoming",
  },
  {
    id: 3,
    homeTeam: "WildWolf FC",
    awayTeam: "Storm City",
    homeTeamLogo: "/logo-fc/wildwolf.jpeg",
    awayTeamLogo: "/logo-fc/wildwolf.jpeg",
    date: "2025-02-01",
    time: "17:00",
    venue: "Sân vận động WildWolf",
    status: "upcoming",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "live":
      return "error";
    case "upcoming":
      return "primary";
    case "finished":
      return "success";
    default:
      return "default";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "live":
      return "ĐANG DIỄN RA";
    case "upcoming":
      return "SẮP DIỄN RA";
    case "finished":
      return "ĐÃ KẾT THÚC";
    default:
      return status;
  }
};

export const MatchSchedule: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "left", mb: 3 }}>
        <Link href="/matches">
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
            Lịch Thi Đấu
          </Typography>
        </Link>
        <Typography variant="body1" color="text.secondary">
          Các trận đấu sắp tới của WildWolf FC
        </Typography>
      </Box>

      <Box sx={{ position: "relative" }}>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation={true}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Navigation, Autoplay]}
          className="match-swiper"
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {upcomingMatches.map((match) => (
            <SwiperSlide key={match.id}>
              <Card
                sx={{
                  height: "100%",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  {/* Status Chip */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      mb: 1.5,
                    }}
                  >
                    <Chip
                      label={getStatusText(match.status)}
                      color={getStatusColor(match.status) as any}
                      size="small"
                      sx={{ fontWeight: 600, fontSize: "0.7rem", height: 20 }}
                    />
                  </Box>

                  {/* Teams */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box sx={{ flex: 1, textAlign: "center" }}>
                      <Avatar
                        src={match.homeTeamLogo}
                        sx={{ width: 35, height: 35, mx: "auto", mb: 0.5 }}
                      />
                      <Typography
                        variant="caption"
                        fontWeight={600}
                        sx={{ fontSize: "0.75rem" }}
                      >
                        {match.homeTeam}
                      </Typography>
                    </Box>

                    <Box sx={{ mx: 1.5 }}>
                      <Typography
                        variant="body2"
                        fontWeight={700}
                        color="primary"
                        sx={{ fontSize: "0.8rem" }}
                      >
                        VS
                      </Typography>
                    </Box>

                    <Box sx={{ flex: 1, textAlign: "center" }}>
                      <Avatar
                        src={match.awayTeamLogo}
                        sx={{ width: 35, height: 35, mx: "auto", mb: 0.5 }}
                      />
                      <Typography
                        variant="caption"
                        fontWeight={600}
                        sx={{ fontSize: "0.75rem" }}
                      >
                        {match.awayTeam}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Match Details */}
                  <Box sx={{ space: 0.5 }}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                    >
                      <CalendarToday
                        sx={{ fontSize: 14, mr: 0.5, color: "text.secondary" }}
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: "0.7rem" }}
                      >
                        {new Date(match.date).toLocaleDateString("vi-VN")}
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                    >
                      <AccessTime
                        sx={{ fontSize: 14, mr: 0.5, color: "text.secondary" }}
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: "0.7rem" }}
                      >
                        {match.time}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocationOn
                        sx={{ fontSize: 14, mr: 0.5, color: "text.secondary" }}
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: "0.7rem" }}
                      >
                        {match.venue}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Custom CSS cho Match Swiper */}
      <style jsx global>{`
        .match-swiper .swiper-button-next,
        .match-swiper .swiper-button-prev {
          color: #1976d2;
          background: rgba(255, 255, 255, 0.9);
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin-top: -17px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        .match-swiper .swiper-button-next:hover,
        .match-swiper .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 1);
          transform: scale(1.1);
        }

        .match-swiper .swiper-button-next::after,
        .match-swiper .swiper-button-prev::after {
          font-size: 14px;
          font-weight: bold;
        }
      `}</style>
    </Container>
  );
};
