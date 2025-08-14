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
  Login as LoginIcon,
  Facebook,
  Google,
} from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToSignup?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onSwitchToSignup,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    const success = await login(email, password);
    if (success) {
      onSuccess?.();
      router.push("/"); 
    } else {
      setError("Email hoặc mật khẩu không đúng");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSocialLogin = (provider: "google" | "facebook") => {
    // TODO: Implement social login
    console.log(`Login with ${provider}`);
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
            Đăng nhập
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Chào mừng trở lại! Vui lòng đăng nhập vào tài khoản của bạn.
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
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 3, py: 1.5 }}
            disabled={isLoading}
            startIcon={
              isLoading ? <CircularProgress size={20} /> : <LoginIcon />
            }
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>

          {/* Social Login */}
          <Box sx={{ mb: 3 }}>
            <Divider sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Hoặc đăng nhập với
              </Typography>
            </Divider>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handleSocialLogin("google")}
                disabled={isLoading}
                startIcon={<Google />}
                sx={{
                  borderColor: "#db4437",
                  color: "#db4437",
                  "&:hover": {
                    borderColor: "#db4437",
                    backgroundColor: "rgba(219, 68, 55, 0.04)",
                  },
                }}
              >
                Google
              </Button>

              <Button
                fullWidth
                variant="outlined"
                onClick={() => handleSocialLogin("facebook")}
                disabled={isLoading}
                startIcon={<Facebook />}
                sx={{
                  borderColor: "#4267B2",
                  color: "#4267B2",
                  "&:hover": {
                    borderColor: "#4267B2",
                    backgroundColor: "rgba(66, 103, 178, 0.04)",
                  },
                }}
              >
                Facebook
              </Button>
            </Box>
          </Box>

          <Link href={"/signup"} style={{ textDecoration: "none" }}>
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
              Chưa có tài khoản? Đăng ký
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
