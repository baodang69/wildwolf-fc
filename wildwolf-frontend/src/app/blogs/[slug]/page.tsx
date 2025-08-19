import { Container } from "@mui/material";
import NextBreadcrumbs from "@/components/ui/Breadcrumb";

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
