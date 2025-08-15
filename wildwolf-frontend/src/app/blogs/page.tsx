import { Container } from "@mui/material";
import NextBreadcrumbs from "@/components/ui/Breadcrumb";
import Link from "next/link";

export default function BlogsPage() {
  return (
    <Container maxWidth="lg">
      <NextBreadcrumbs />
      <h1>Blog page</h1>
      <p>Đây là chỗ list blog</p>
      <ul>
        <li>
          <Link href="/blogs/1">Blog 1 </Link>
          <Link href="/blogs/2">Blog 2 </Link>
        </li>
      </ul>
    </Container>
  );
}
