import { Container } from "@mui/material";
import NextBreadcrumbs from "@/components/layout/Breadcrumb";

export default function BlogDetailPage() {
  return (
    <Container maxWidth="lg">
      <NextBreadcrumbs />
      <h1>Blog detail</h1>
      <p>Đây là chỗ hiển thị blog detail</p>
    </Container>
  );
}
