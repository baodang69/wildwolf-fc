"use client";

import {
  Box,
  Typography,
  FormControl,
  OutlinedInput,
  TextField,
  Button,
  Avatar,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import {
  PhotoCamera,
  CalendarToday,
  AccessTime,
  LocationOn,
} from "@mui/icons-material";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";

interface MatchRequestFormData {
  teamName: string;
  logo: string | null;
  matchDate: string;
  matchTime: string;
  venue: string;
  notes: string;
}

interface ContactCardProps {
  onSubmit?: (data: MatchRequestFormData) => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<MatchRequestFormData>({
    teamName: "",
    logo: null,
    matchDate: "",
    matchTime: "",
    venue: "",
    notes: "",
  });

  const handleInputChange =
    (field: keyof MatchRequestFormData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [field]: event.target.value,
      });
    };

  const handleLogoUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          setFormData({
            ...formData,
            logo: result,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (
      !formData.teamName ||
      !formData.matchDate ||
      !formData.matchTime ||
      !formData.venue
    ) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        maxWidth: 800,
        margin: "0 auto",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          boxShadow: 3,
          borderRadius: 2,
          padding: 3,
          marginBottom: 3,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography variant="body1">
          Nếu bạn có mong muốn giao lưu với FC. Vui lòng điền đầy đủ thông tin
          bên dưới.
        </Typography>
        <Typography variant="body1">
          Hoặc liên hệ với fanpage{" "}
          <MuiLink
            href="https://web.facebook.com/profile.php?id=61557740967403"
            sx={{
              textDecoration: "none",
              transition: "all 0.2s ease-in-out",
              color: "blue",
              "&:hover": {
                filter: "brightness(0.8)",
                color: "blue",
                transform: "scale(1.02)",
                textDecoration: "underline",
              },
            }}
          >
            FC Sói Hoang
          </MuiLink>
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          boxShadow: 3,
          borderRadius: 2,
          padding: 4,
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            marginBottom: 3,
            textAlign: "center",
          }}
        >
          Hẹn Đối
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <FormControl fullWidth>
                <TextField
                  label="Tên đội"
                  variant="outlined"
                  placeholder="Nhập tên đội của bạn"
                  value={formData.teamName}
                  onChange={handleInputChange("teamName")}
                  required
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}></Typography>,
                  }}
                />
              </FormControl>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  height: "100%",
                }}
              >
                <Avatar
                  src={formData.logo || undefined}
                  sx={{
                    width: 60,
                    height: 60,
                    border: "2px dashed #ccc",
                  }}
                ></Avatar>
                <Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Logo đội
                  </Typography>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="logo-upload"
                    type="file"
                    onChange={handleLogoUpload}
                  />
                  <label htmlFor="logo-upload">
                    <IconButton
                      color="primary"
                      aria-label="upload logo"
                      component="span"
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: 1,
                      }}
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <FormControl fullWidth>
                <TextField
                  label="Lịch hẹn"
                  type="date"
                  variant="outlined"
                  value={formData.matchDate}
                  onChange={handleInputChange("matchDate")}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <CalendarToday sx={{ mr: 1, color: "#666" }} />
                    ),
                  }}
                />
              </FormControl>
            </Box>

            <Box sx={{ flex: 1 }}>
              <FormControl fullWidth>
                <TextField
                  label="Thời gian"
                  type="time"
                  variant="outlined"
                  value={formData.matchTime}
                  onChange={handleInputChange("matchTime")}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <AccessTime sx={{ mr: 1, color: "#666" }} />
                    ),
                  }}
                />
              </FormControl>
            </Box>
          </Box>
          <Box>
            <FormControl fullWidth>
              <TextField
                label="Sân"
                variant="outlined"
                placeholder="Địa chỉ sân bóng"
                value={formData.venue}
                onChange={handleInputChange("venue")}
                required
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                placeholder="Thêm ghi chú (tùy chọn)"
                value={formData.notes}
                onChange={handleInputChange("notes")}
                multiline
                rows={4}
              />
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button type="submit" variant="outlined" size="large">
              Gửi lời mời hẹn đối
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
