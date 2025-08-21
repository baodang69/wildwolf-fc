import { Box } from "@mui/material";
import { VideoCardProp } from "./type/video.type";

export const VideosTab = ({ videos }: VideoCardProp) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        },
        gap: 4,
        padding: 2,
      }}
    >
      {videos.map((video) => (
        <Box
          key={video.id}
          sx={{
            border: "1px solid #ddd",
            borderRadius: 1,
            overflow: "hidden",
            backgroundColor: "#f9f9f9",
          }}
        >
          <video
            controls
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
            }}
          >
            <source src={video.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <Box sx={{ p: 2 }}>
            <h3 style={{ margin: "0 0 8px 0" }}>{video.title}</h3>
            <p style={{ margin: "0 0 8px 0", color: "#666" }}>
              {video.description}
            </p>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                color: "#888",
              }}
            >
              <span>{video.date}</span>
              <span>{video.views} views</span>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
