import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WildWolf FC - Login",
  description:
    "Đăng nhập vào WildWolf FC để truy cập các tính năng dành cho thành viên.",
  icons: {
    icon: "/favicon/favicon.ico",
  },
  openGraph: {
    title: "WildWolf FC - Login",
    description:
      "Đăng nhập vào WildWolf FC để truy cập các tính năng dành cho thành viên.",
    url: "https://wildwolffc.com/login",
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

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
