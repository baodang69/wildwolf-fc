import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@mui/material";
import Link from "next/link";
import { Blog, SiderBlogCardProps } from "../../interfaces/blog.type";
import { SiderBlogCard } from "./SiderBlogCard";

const sample = [
  {
    _id: "a",
    content: "",
    summary: "",
    title: "Bài viết mới nhất 1",
    author: {
      _id: "1",
      fullname: "Author 1",
      avatar: "",
    },
    createdAt: new Date().toISOString(),
    like: 0,
    coverImage: "/logo-fc/wildwolf.jpeg",
    slug: "a",
    tags: [],
    hot: false,
  },
  {
    _id: "b",
    content: "",
    summary: "",
    title: "Bài viết mới nhất 2",
    author: {
      _id: "2",
      fullname: "Author 2",
      avatar: "/logo-fc/wildwolf.jpeg",
    },
    createdAt: new Date().toISOString(),
    like: 0,
    coverImage: "/logo-fc/wildwolf.jpeg",
    slug: "b",
    tags: [],
    hot: false,
  },
  {
    _id: "c",
    content: "",
    summary: "",
    title: "Bài viết mới nhất 3",
    author: {
      _id: "3",
      fullname: "Author 3",
      avatar: "/logo-fc/wildwolf.jpeg",
    },
    createdAt: new Date().toISOString(),
    like: 0,
    coverImage: "/logo-fc/wildwolf.jpeg",
    slug: "c",
    tags: [],
    hot: false,
  },
];

export const SideBar = ({ blog }: { blog: Blog[] }) => {
  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 2,
          fontSize: 20,
          position: "relative",
          paddingBottom: 1,
          "&:after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 40,
            height: 3,
            bgcolor: "primary.main",
            borderRadius: 1,
          },
        }}
      >
        Tin nổi bật
      </Typography>

      {blog.slice(0, 3).map((bl) => (
        <SiderBlogCard blog={bl} key={bl._id} />
      ))}
    </Box>
  );
};

export default SideBar;
