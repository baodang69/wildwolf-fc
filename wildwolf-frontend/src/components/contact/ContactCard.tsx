"use client";

import {
  Box,
  Typography,
  FormControl,
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
import { useState, ChangeEvent, FormEvent } from "react";
import { MatchRequestData, FormData } from "../../interfaces/contact.type";
import React from "react";
import createContacts from "../../api/contacts/index";

interface ContactCardProps {
  onSubmit?: (data: MatchRequestData) => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    opponent_club: "",
    opponent_logo: "",
    matchDate: "",
    matchTime: "",
    stadium: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange =
    (field: keyof FormData) =>
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
            opponent_logo: result,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (
      !formData.opponent_club ||
      !formData.matchDate ||
      !formData.matchTime ||
      !formData.stadium
    ) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    setLoading(true);

    try {
      const combinedDateTime = new Date(
        `${formData.matchDate}T${formData.matchTime}:00.000Z`
      );

      const apiData: MatchRequestData = {
        opponent: "689034d352a3889955553985", // Hardcode
        appointmenttime: combinedDateTime.toISOString(), // Hợp 2 field thành 1
        stadium: formData.stadium,
        opponent_club: formData.opponent_club,
        opponent_logo: formData.opponent_logo || "",
        note: formData.note || "",
      };

      console.log("Sending data to API:", apiData);

      const result = await createContacts(apiData);
      console.log("Contact created successfully:", result);

      if (onSubmit) {
        onSubmit(apiData);
      }

      alert("Gửi lời mời thành công!");
      setFormData({
        opponent_club: "",
        opponent_logo: "",
        matchDate: "",
        matchTime: "",
        stadium: "",
        note: "",
      });
    } catch (error) {
      console.error("Error creating contact:", error);
      alert("Có lỗi xảy ra khi gửi lời mời!");
    } finally {
      setLoading(false);
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
                  value={formData.opponent_club}
                  onChange={handleInputChange("opponent_club")}
                  required
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
                  src={formData.opponent_logo || undefined}
                  sx={{
                    width: 60,
                    height: 60,
                    border: "2px dashed #ccc",
                  }}
                />
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
                  label="Ngày hẹn"
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
                value={formData.stadium}
                onChange={handleInputChange("stadium")}
                required
                InputProps={{
                  startAdornment: <LocationOn sx={{ mr: 1, color: "#666" }} />,
                }}
              />
            </FormControl>
          </Box>

          <Box>
            <FormControl fullWidth>
              <TextField
                label="Ghi chú"
                variant="outlined"
                placeholder="Thêm ghi chú (tùy chọn)"
                value={formData.note}
                onChange={handleInputChange("note")}
                multiline
                rows={4}
              />
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              type="submit"
              variant="outlined"
              size="large"
              disabled={loading}
            >
              {loading ? "Đang gửi..." : "Gửi lời mời hẹn đối"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
