"use client";

import React from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { Sports, Group, CalendarToday, Article } from "@mui/icons-material";
import Link from "next/link";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <Container maxWidth="lg">
      {isAuthenticated ? (
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            Chào mừng trở lại, {user?.name}!
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                      Thông tin cá nhân
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Email: {user?.email}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Vai trò: {user?.role}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                      Hoạt động gần đây
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Chưa có hoạt động nào được ghi nhận.
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>

            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Thông báo
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Chào mừng bạn đến với hệ thống quản lý WildWolf FC!
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      ) : (
        <Box>
          {/* Hero Section */}
          <Box sx={{ textAlign: "center", py: 8, mb: 6 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Chào mừng đến với WildWolf FC
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
              Câu lạc bộ bóng đá chuyên nghiệp
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto", mb: 4 }}
            >
              Tham gia cùng chúng tôi để trải nghiệm những trận đấu hấp dẫn và
              kết nối với cộng đồng yêu bóng đá.
            </Typography>
            <Link href="/auth" style={{ textDecoration: "none" }}>
              <Button variant="contained" size="large">
                Đăng nhập ngay
              </Button>
            </Link>
          </Box>

          {/* Features Section */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 4,
            }}
          >
            <Card sx={{ textAlign: "center", p: 2 }}>
              <CardContent>
                <Group sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Thành viên
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Khám phá đội hình và thông tin các cầu thủ
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ textAlign: "center", p: 2 }}>
              <CardContent>
                <CalendarToday
                  sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  Trận đấu
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lịch thi đấu và kết quả các trận đấu
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ textAlign: "center", p: 2 }}>
              <CardContent>
                <Article sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Tin tức
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cập nhật tin tức mới nhất về câu lạc bộ
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ textAlign: "center", p: 2 }}>
              <CardContent>
                <Sports sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Thư viện
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Hình ảnh và video các hoạt động
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      )}
    </Container>
  );
}
