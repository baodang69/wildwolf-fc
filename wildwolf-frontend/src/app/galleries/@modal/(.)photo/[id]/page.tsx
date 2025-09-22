"use client";

import { use, useState, useEffect } from "react";
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
  Skeleton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Photo } from "@/interfaces/photo.type";
import { getImageDetail } from "@/api/galleries";
import { shortenName } from "./../../../../../utils/shortenName";

interface PhotoModalProps {
  params: Promise<{ id: string }>;
}

export default function PhotoModal({ params }: PhotoModalProps) {
  const router = useRouter();
  const { id } = use(params);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [photo, setPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchPhoto = async () => {
      try {
        const data = await getImageDetail(id);
        console.log("Data: " + data.data);
        setPhoto(data.data);
      } catch (error) {
        console.log("Error fetching data: " + error);
      }
    };
    fetchPhoto();
  }, [id]);

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
            position: "relative",
          }}
        >
          {!imgLoaded && (
            <Skeleton
              variant="rectangular"
              width="100%"
              sx={{ maxHeight: "80vh" }}
              animation="wave"
            />
          )}

          <img
            src={photo.imageUrl}
            alt={photo.title}
            onLoad={() => setImgLoaded(true)}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "80vh",
              objectFit: "contain",
              display: imgLoaded ? "block" : "none",
            }}
          />
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "400px" },
            display: "flex",
            flexDirection: "column",
            opacity: imgLoaded ? 1 : 0,
            transition: "opacity 0.5s ease-in",
            borderLeft: { md: "1px solid #dbdbdb" },
          }}
        >
          {/* Header */}
          <Box sx={{ p: 2, borderBottom: "1px solid #efefef" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ width: 32, height: 32 }}>
                {photo.user.avatar}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight="600">
                  {photo.user.fullname}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(photo.createdAt).toLocaleDateString("vi-VN")}
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
              {photo.userLiked.length > 0 ? <Typography variant="body2" color="text.secondary">
                Liked by{" "}
                {shortenName(photo.userLiked.map((user) => user.fullname))}
              </Typography> : null}
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
