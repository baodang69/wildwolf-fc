import React from "react";
import { HotBlogCardProps } from "../../interfaces/blog.type";
import Image from "next/image";
import { Box, Chip, Typography, Avatar, Stack } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export const HotBlogCard: React.FC<HotBlogCardProps> = ({ blog }) => {
  if (!blog) return null;

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        height: { xs: 260, sm: 320, lg: 450 },
      }}
    >
      {/* Background image */}
      <Box sx={{ position: "absolute", inset: 0 }}>
        <Image
          src={blog.coverImage || "/logo-fc/wildwolf.jpeg"}
          alt={blog.slug}
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>

      {/* Bottom overlay */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          p: { xs: 2, sm: 3 },
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.75) 100%)",
          color: "#fff",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Box sx={{ maxWidth: { xs: "70%", md: "75%" } }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "#fff", mb: 0.5 }}
            >
              {blog.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.85)", mb: 1 }}
            >
              {blog.summary}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  src={blog.author.avatar || "/logo-fc/wildwolf.jpeg"}
                  sx={{ width: 34, height: 34 }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.95)", fontWeight: 700 }}
                >
                  {blog.author.fullname}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255,255,255,0.8)" }}
                >
                  {new Date(blog.createdAt).toLocaleDateString("vi-VN")}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 1,
            }}
          >
            <ArrowForwardIosIcon sx={{ color: "rgba(255,255,255,0.9)" }} />
            <Box
              sx={{
                display: "flex",
                gap: 1,
                mt: 1,
                flexWrap: "wrap",
                justifyContent: "flex-end",
              }}
            >
              {blog.tags.slice(0, 3).map((tag: string, i: number) => (
                <Chip
                  key={i}
                  label={tag}
                  size="small"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.08)",
                    color: "#fff",
                    borderRadius: 2,
                  }}
                />
              ))}
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
