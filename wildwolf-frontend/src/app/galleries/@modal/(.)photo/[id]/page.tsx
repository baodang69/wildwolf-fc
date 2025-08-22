"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  IconButton,
  Avatar,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Photo } from "@/components/gallery/type/photo.type";

interface PhotoModalProps {
  params: Promise<{ id: string }>;
}

export default function PhotoModal({ params }: PhotoModalProps) {
  const router = useRouter();
  const { id } = use(params);
  const getPhotoById = (id: string): Photo | null => {
    const photos: Photo[] = [
      {
        id: "1",
        src: "/images/team-photo-1.jpg",
        title: "Đội hình chính thức 2025",
        description: "Ảnh đội hình chính thức mùa giải 2025",
        date: new Date("2025-01-15"),
        like: {
          _id: "like_001",
          fullname: "Nguyễn Văn An",
        },
        status: "SHOW",
        size: "213KB",
      },
      {
        id: "2",
        src: "/images/team-photo-2.jpg",
        title: "Buổi tập luyện",
        description: "Hình ảnh buổi tập luyện chuẩn bị cho trận đấu",
        date: new Date("2025-01-10"),
        like: {
          _id: "like_002",
          fullname: "Trần Thị Bình",
        },

        status: "SHOW",
        size: "213KB",
      },
      {
        id: "3",
        src: "/images/team-photo-3.jpg",
        title: "Chiến thắng vòng 1",
        description: "Khoảnh khắc ăn mừng chiến thắng",
        date: new Date("2025-01-05"),
        like: {
          _id: "like_003",
          fullname: "Lê Văn Cường",
        },

        status: "SHOW",
        size: "213KB",
      },
      {
        id: "4",
        src: "/images/team-photo-4.jpg",
        title: "Giao hữu đội bạn",
        description: "Trận giao hữu với đội bóng địa phương",
        date: new Date("2025-01-03"),
        like: {
          _id: "like_004",
          fullname: "Phạm Thị Dung",
        },

        status: "SHOW",
        size: "213KB",
      },
      {
        id: "5",
        src: "/images/team-photo-5.jpg",
        title: "Lễ khai mạc mùa giải",
        description: "Buổi lễ khai mạc mùa giải mới",
        date: new Date("2025-01-01"),
        like: {
          _id: "like_005",
          fullname: "Hoàng Văn Em",
        },

        status: "SHOW",
        size: "213KB",
      },
      {
        id: "6",
        src: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ1mUs9hZvSUOevwBwYVh43am5dpIJhSZavvYWr6soJEI6GK1NYvBdHtUGaiDwGY2iQ9WoHxWDX9HFmI7lXSU9r2wlIk6DoUcC3cTwhFw",
        title: "Chụp ảnh kỷ niệm",
        description: "Ảnh kỷ niệm cùng ban huấn luyện",
        date: new Date("2024-12-30"),
        like: {
          _id: "like_006",
          fullname: "Vũ Thị Giang",
        },

        status: "SHOW",
        size: "213KB",
      },
    ];

    return photos.find((photo) => photo.id === id) || null;
  };

  const photo = getPhotoById(id);

  const handleClose = () => {
    router.back();
  };

  if (!photo) {
    return (
      <Dialog open onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <Typography>Không tìm thấy ảnh với ID: {id}</Typography>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog
      open
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: "90vh",
          margin: 2,
        },
      }}
    >
      <DialogTitle sx={{ p: 0, position: "relative" }}>
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.7)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          p: 0,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "black",
          }}
        >
          <img
            src={photo.src}
            alt={photo.title}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "80vh",
              objectFit: "contain",
            }}
          />
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "400px" },
            display: "flex",
            flexDirection: "column",
            borderLeft: { md: "1px solid #dbdbdb" },
          }}
        >
          {/* Header */}
          <Box sx={{ p: 2, borderBottom: "1px solid #efefef" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ width: 32, height: 32 }}>
                {photo.like.fullname.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight="600">
                  {photo.like.fullname}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {photo.date.toLocaleDateString("vi-VN")}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ p: 2, flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              {photo.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.5 }}
            >
              {photo.description}
            </Typography>
          </Box>

          <Box sx={{ p: 2, borderTop: "1px solid #efefef" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <IconButton size="small" color="primary">
                  <FavoriteIcon />
                </IconButton>
                <IconButton size="small">
                  <ShareIcon />
                </IconButton>
              </Box>

              <Typography variant="body2" color="text.secondary">
                Liked by {photo.like.fullname}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
