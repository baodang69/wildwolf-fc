import { Container, Box, TextField } from "@mui/material";
import NextBreadcrumbs from "@/components/ui/Breadcrumb";
import { HotBlogCard } from "@/components/blog/HotBlogCard";
import { BlogCard } from "@/components/blog/BlogCard";
import { SideBar } from "@/components/blog/SideBar";

export default function BlogsPage() {
  const blog = {
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
  ];

  return (
    <Container maxWidth="lg">
      <NextBreadcrumbs />
      <h1>Tin tức</h1>
      <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
        <Box sx={{ flex: "0 0 75%", display: "flex", flexDirection: "column" }}>
          <HotBlogCard blog={blog} />
          <TextField
            id="outlined-basic"
            label="Search blog..."
            variant="outlined"
            sx={{
              marginTop: 3,
              marginLeft: "auto",
              width: 280,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                "& fieldset": {
                  borderWidth: 2,
                },
                "&:hover fieldset": {
                  borderWidth: 2,
                },
                "&.Mui-focused fieldset": {
                  borderWidth: 2,
                },
              },
            }}
          />
          <Box
            sx={{
              mt: 2,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <BlogCard blog={blog} size={{ width: "100%", height: "360px" }} />
            <BlogCard blog={blog} size={{ width: "100%", height: "360px" }} />
            <BlogCard blog={blog} size={{ width: "100%", height: "360px" }} />
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
          <SideBar blog={siderblog} />
        </Box>
      </Box>
    </Container>
  );
}
