import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WildWolf FC - Signup",
  description:
    "Đăng ký tài khoản WildWolf FC để tham gia cộng đồng và nhận các cập nhật sớm nhất.",
  icons: {
    icon: "/favicon/favicon.ico",
  },
  openGraph: {
    title: "WildWolf FC - Signup",
    description:
      "Đăng ký tài khoản WildWolf FC để tham gia cộng đồng và nhận các cập nhật sớm nhất.",
    url: "https://wildwolffc.com/signup",
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
export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
