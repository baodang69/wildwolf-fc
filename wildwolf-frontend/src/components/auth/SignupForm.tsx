"use client";

import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  PersonAdd,
  Person,
  Facebook,
  Google,
} from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";

interface SignupFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  onSuccess,
  onSwitchToLogin,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setIsLoading(true);
    try {
      // Giả lập API call - thay thế bằng API thực tế
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Giả lập thành công
      onSuccess?.();
    } catch (error) {
      setError("Có lỗi xảy ra khi đăng ký");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSocialSignup = (provider: "google" | "facebook") => {
    // TODO: Implement social signup
    console.log(`Signup with ${provider}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 450,
        mx: "auto",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderRadius: 3,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          {/* Logo FC */}
          <Box sx={{ mb: 2 }}>
            <Image
              src="/logo-fc/wildwolf.jpeg"
              alt="WildWolf FC Logo"
              width={80}
              height={80}
              style={{
                borderRadius: "50%",
                border: "3px solid #000000",
              }}
            />
          </Box>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            WildWolf FC
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Đăng ký
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tạo tài khoản mới để tham gia WildWolf FC
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Họ và tên"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange("name")}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              },
            }}
            disabled={isLoading}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange("email")}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              },
            }}
            disabled={isLoading}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange("password")}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            disabled={isLoading}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange("confirmPassword")}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={toggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            disabled={isLoading}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 3, py: 1.5 }}
            disabled={isLoading}
            startIcon={
              isLoading ? <CircularProgress size={20} /> : <PersonAdd />
            }
          >
            {isLoading ? "Đang đăng ký..." : "Đăng ký"}
          </Button>

          <Link href={"/login"} style={{ textDecoration: "none" }}>
            <Button
              fullWidth
              variant="text"
              disabled={isLoading}
              sx={{
                color: "primary.main",
                textDecoration: "none",
                mt: 1,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              Đã có tài khoản? Đăng nhập
            </Button>
          </Link>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            textAlign: "center",
            mt: 3,
            pt: 3,
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2025 WildWolf FC. Tất cả quyền được bảo lưu.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
