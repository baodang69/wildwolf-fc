"use client";

import React, { useState } from "react";
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { AccountCircle, Logout, Settings, Person } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";

export const UserMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuth();
  const router = useRouter();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    router.push("/");
  };

  const handleProfile = () => {
    handleClose();
    router.push("/profile");
  };

  const handleSettings = () => {
    handleClose();
    router.push("/settings");
  };

  if (!user) {
    return null;
  }

  // Tạo avatar từ tên user
  const getAvatarText = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
          {getAvatarText(user.fullname)}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            minWidth: 200,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {user.fullname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
          {user.role && (
            <Typography variant="caption" color="primary">
              {user.role}
            </Typography>
          )}
        </Box>

        <Divider />

        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText>Hồ sơ cá nhân</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleSettings}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cài đặt</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Đăng xuất</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};
