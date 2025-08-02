"use client";

import React from "react";
import { Container, Box, Typography, Card, CardContent } from "@mui/material";
import { Header } from "../components/layout/Header";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <Box>
      <Header />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {isAuthenticated ? (
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              Chào mừng trở lại, {user?.name}!
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 3 }}>
                <Box sx={{ flex: "1 1 300px", minWidth: 300 }}>
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

                <Box sx={{ flex: "1 1 300px", minWidth: 300 }}>
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

              <Box sx={{ width: "100%" }}>
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
          </Box>
        ) : (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Chào mừng đến với WildWolf FC
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
              Câu lạc bộ bóng đá chuyên nghiệp
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto" }}
            >
              Tham gia cùng chúng tôi để trải nghiệm những trận đấu hấp dẫn và
              kết nối với cộng đồng yêu bóng đá. Đăng nhập để truy cập đầy đủ
              các tính năng.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
