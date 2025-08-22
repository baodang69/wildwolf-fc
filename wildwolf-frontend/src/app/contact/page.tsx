import { Container } from "@mui/material";
import NextBreadcrumbs from "@/components/ui/Breadcrumb";
import { ContactCard } from "@/components/contact/ContactCard";

export default function ContactPage() {
  return (
    <Container maxWidth="lg">
      <Container>
        <NextBreadcrumbs />
        <h1>Liên hệ</h1>
        <ContactCard></ContactCard>
      </Container>
    </Container>
  );
}
