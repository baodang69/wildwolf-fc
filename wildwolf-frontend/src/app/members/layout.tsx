import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WildWolf FC - Member Page",
  description:
    "Access the member area of WildWolf FC for formations and player preview.",
  icons: {
    icon: "/favicon/favicon.ico",
  },
  openGraph: {
    title: "WildWolf FC - Member Page",
    description:
      "Join WildWolf FC members to stay connected with club news, matches, and events.",
    url: "https://wildwolffc.com/member",
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

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
