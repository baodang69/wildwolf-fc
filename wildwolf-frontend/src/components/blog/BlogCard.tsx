"use client";

import React from "react";
import Image from "next/image";
import { Box, Avatar, Typography, Chip, Stack } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Link from "next/link";
import { BlogCardProps } from "./type/blog.type";

export const BlogCard: React.FC<BlogCardProps> = ({ blog, size }) => {
  return (
    <Box
      sx={{
        width: size.width,
        height: size.height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        cursor: "pointer",
        px: 0.5,
        py: 1,
        marginBottom: 4,
        // targeted hover effects: cover and avatar separately
        "& img.cover": {
          transition: "transform 220ms ease, filter 220ms ease",
        },
        "& img.cover:hover": {
          transform: "scale(1.04) translateZ(0)",
          filter: "brightness(0.98) contrast(1.02)",
        },
        "& img.avatar": {
          transition: "transform 200ms ease",
        },
        "& img.avatar:hover": {
          transform: "scale(1.14) translateZ(0)",
        },
      }}
    >
      <Link href={`/blog/${blog._id}`} style={{ textDecoration: "none" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 200,
          }}
        >
          <Image
            className="cover"
            fill
            src={blog.coverImage}
            alt={blog.slug}
            style={{
              borderRadius: "20px",
              objectFit: "cover",
              display: "flex",
              justifyContent: "center",
            }}
          />
        </div>
      </Link>

      <Box sx={{ display: "flex", gap: 1, paddingY: 1, flexWrap: "wrap" }}>
        {blog.tags.map((bl, index) => {
          return (
            <Chip
              key={index}
              label={bl}
              size="small"
              sx={(theme) => ({
                mb: 1,
                // base background; adjust for dark mode
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(0,0,0,0.03)",
                color:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.9)"
                    : theme.palette.text.secondary,
                display: "inline-flex",
                alignSelf: "flex-start",
                px: 1.2,
                borderRadius: 1.5,
                height: 28,
                fontSize: "0.75rem",
                padding: 1,
                margin: 0.5,
                transition:
                  "transform 160ms ease, background-color 160ms ease, box-shadow 160ms ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.06)",
                },
              })}
            />
          );
        })}
      </Box>
      <Link href={`/blog/${blog._id}`} style={{ textDecoration: "none" }}>
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 700,
            position: "relative",
            display: "inline-block",
            mb: 0.5,
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
          {blog.title}
        </Typography>
        <Typography
          sx={{
            color: "#4B5563",
            mb: 1.25,
            fontSize: 14,
          }}
        >
          {blog.summary}
        </Typography>
      </Link>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Image
          className="avatar"
          width={40}
          height={40}
          src={blog.author.avatar}
          alt={blog.author.fullname}
          style={{
            borderRadius: "50%",
          }}
        />
        <Box sx={{ gap: 0.5 }}>
          <Typography
            sx={{
              fontWeight: 700,
              transition: "text-decoration 120ms ease",
              "&:hover": { textDecoration: "underline" },
              cursor: "pointer",
            }}
          >
            {blog.author.fullname}
          </Typography>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <CalendarTodayIcon sx={{ fontSize: 14, color: "#6B7280" }} />
            <Typography
              sx={{
                color: "#6B7280",
                fontSize: 12,
                transition: "text-decoration 120ms ease",
                "&:hover": { textDecoration: "underline" },
                cursor: "pointer",
              }}
            >
              {new Date(blog.createdAt).toLocaleDateString("vi-VN")}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
