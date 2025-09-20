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
import Image from "next/image";
import { Blog, SiderBlogCardProps } from "../../interfaces/blog.type";

export const SiderBlogCard: React.FC<SiderBlogCardProps> = ({ blog }) => (
  <Box sx={{ width: "100%", mb: 3 }}>
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "flex-start",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          position: "relative",
          flexShrink: 0,
          width: "100%",
          height: 140,
        }}
      >
        <Image
          src={blog.coverImage}
          alt={blog.slug}
          fill
          style={{
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Link href={`/blog/${blog._id}`} style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 16,
              lineHeight: 1.3,
              color: "black",
            }}
          >
            {blog.title} alooasina sjbvskdjvbsd kvjsndkvj bkjhldjnzl
            sadascxczczxcasdqwdsc jịndfksdjvnkj
          </Typography>
        </Link>
      </Box>
    </Box>
    <Divider sx={{ mt: 2 }} />
  </Box>
);

export default SiderBlogCard;
