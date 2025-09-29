import { Container } from "@mui/material";
import NextBreadcrumbs from "@/components/ui/Breadcrumb";
import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  const blog = {
    title: `WildWolf FC Blog - ${slug}`,
    description: `Đọc bài viết chi tiết về ${slug} trên WildWolf FC.`,
    coverImage:
      "https://res.cloudinary.com/dqxzklfzz/image/upload/v1759171454/wildwolf_yjylpx.jpg",
  };

  return {
    title: blog.title,
    description: blog.description,
    icons: {
      icon: "/favicon/favicon.ico",
    },
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: `https://wildwolffc.com/blogs/${slug}`,
      siteName: "WildWolf FC",
      images: [
        {
          url: blog.coverImage,
          width: 1200,
          height: 630,
          alt: "WildWolf FC Logo",
        },
      ],
      locale: "vi_VN",
      type: "article",
    },
  };
}

export default function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  return (
    <Container maxWidth="lg">
      <Container>
        <NextBreadcrumbs />
        <h1>Blog detail</h1>
        <p>Đây là chỗ hiển thị blog detail số {slug}</p>
      </Container>
    </Container>
  );
}
