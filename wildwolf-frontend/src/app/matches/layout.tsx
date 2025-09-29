import { Metadata } from "next";
import React from "react"

export const metadata: Metadata = {
  title: "WildWolf FC - Matches Page",
  description:
    "View the latest match schedule and results of WildWolf FC on our Matches Page.",
  icons: {
    icon: "/favicon/favicon.ico",
  },
  openGraph: {
    title: "WildWolf FC - Matches Page",
    description:
      "Stay updated with WildWolf FC's latest match schedules and results.",
    url: "https://wildwolffc.com/matches",
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

export default function MatchesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
