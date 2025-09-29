import { Container } from "@mui/material";
import NextBreadcrumbs from "@/components/ui/Breadcrumb";
import { ContactCard } from "@/components/contact/ContactCard";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "WildWolf FC - Contact Page",
  description:
    "Get in touch with WildWolf FC. Reach out to our team for inquiries, support, and partnership opportunities.",
  icons: {
    icon: "/favicon/favicon.ico",
  },
  openGraph: {
    title: "WildWolf FC - Contact Page",
    description:
      "Contact WildWolf FC to connect with the club, get support or partnership info.",
    url: "https://wildwolffc.com/contact",
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
