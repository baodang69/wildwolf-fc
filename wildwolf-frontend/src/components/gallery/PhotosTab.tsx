"use client";

import Link from "next/link";
import { Box } from "@mui/material";
import { PhotoCardProp } from "../../interfaces/photo.type";
import { useState } from "react";
import Skeleton from "@mui/material/Skeleton";

export const PhotosTab = ({ photos }: PhotoCardProp) => {
  const [loadedPhotos, setLoadedPhotos] = useState<string[]>([]);

  const handleImageLoad = (id: string) => {
    setLoadedPhotos((prev) => [...prev, id]);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(3, 1fr)",
        },
        padding: 1,
        gap: 2,
      }}
    >
      {photos.map((photo) => {
        const isLoaded = loadedPhotos.includes(photo._id);

        return (
          <Link
            key={photo._id}
            href={`/galleries/photo/${photo._id}`}
            style={{ textDecoration: "none" }}
          >
            <Box
              sx={{
                border: "1px solid #ddd",
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                  filter: "brightness(0.8)",
                  transform: "scale(1.02)",
                  boxShadow: 3,
                },
                position: "relative",
                width: "100%",
                height: "200px",
              }}
            >
              {!isLoaded && (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="200px"
                  animation="wave"
                  sx={{ position: "absolute", top: 0, left: 0 }}
                />
              )}

              <img
                src={photo.imageUrl}
                alt={photo.title}
                onLoad={() => handleImageLoad(photo._id)}
                onError={() => {
                  console.error("Failed to load image:", photo.imageUrl);
                  handleImageLoad(photo._id);
                }}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  display: isLoaded ? "block" : "none",
                }}
              />
            </Box>
          </Link>
        );
      })}
    </Box>
  );
};
