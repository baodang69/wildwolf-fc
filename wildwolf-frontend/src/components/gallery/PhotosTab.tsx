// app/components/gallery/PhotosTab.tsx
import Link from "next/link";
import { Box } from "@mui/material";
import { PhotoCardProp } from "./type/photo.type";

export const PhotosTab = ({ photos }: PhotoCardProp) => {
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
      }}
    >
      {photos.map((photo) => (
        <Link
          key={photo.id}
          href={`/gallery/photo/${photo.id}`}
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
            }}
          >
            <img
              src={photo.src}
              alt={photo.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />
          </Box>
        </Link>
      ))}
    </Box>
  );
};
