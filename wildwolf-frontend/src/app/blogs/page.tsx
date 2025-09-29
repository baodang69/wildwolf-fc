import { Container, Box, TextField } from "@mui/material";
import NextBreadcrumbs from "@/components/ui/Breadcrumb";
import { HotBlogCard } from "@/components/blog/HotBlogCard";
import { BlogCard } from "@/components/blog/BlogCard";
import { SideBar } from "@/components/blog/SideBar";
import { Divider } from "@mui/material";
import { SearchInput } from "@/components/ui/SearchInput";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WildWolf FC - Blogs Page",
  description:
    "Stay updated with the latest news, articles, and stories about WildWolf FC and football.",
  icons: {
    icon: "/favicon/favicon.ico",
  },
  openGraph: {
    title: "WildWolf FC - Blogs Page",
    description: "Explore the latest blogs and updates from WildWolf FC.",
    url: "https://wildwolffc.com/blogs",
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
export default function BlogsPage() {
  const blogHot = {
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
  };
  const blogNews = [
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
  ];
  const siderblog = [
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
  ];

  return (
    <Container maxWidth="lg">
      <Container>
        <NextBreadcrumbs />
        <Box sx={{ display: "flex" }}>
          <h1>Tin tức</h1>
          <SearchInput width="200"></SearchInput>
        </Box>
        <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
          <Box
            sx={{ flex: "0 0 75%", display: "flex", flexDirection: "column" }}
          >
            <HotBlogCard blog={blogHot} />
            <Divider
              orientation="horizontal"
              variant="middle"
              flexItem
              sx={{ mt: 3 }}
            />
            <Box
              sx={{
                mt: 2,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              {blogNews.map((b) => {
                return (
                  <BlogCard
                    key={b._id}
                    blog={b}
                    size={{ width: "100%", height: "360px" }}
                  />
                );
              })}
            </Box>
          </Box>

          <Box
            sx={{
              flex: "0 0 25%",
              position: "sticky",
              top: 0,
              alignSelf: "flex-start",
            }}
          >
            <Divider
              variant="middle"
              flexItem
              orientation="vertical"
              sx={{ marginX: 2 }}
            />
            <SideBar blog={siderblog} />
          </Box>
        </Box>
      </Container>
    </Container>
  );
}
