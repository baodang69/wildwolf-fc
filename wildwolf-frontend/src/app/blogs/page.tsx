import { Container } from "@mui/material";
import NextBreadcrumbs from "@/components/layout/Breadcrumb";

export default function BlogsPage() {
  return (
    <Container maxWidth="lg">
      <NextBreadcrumbs />
      <h1>Blog page</h1>
      <p>Đây là chỗ list blog</p>
    </Container>
  );
}
