import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loading() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "30%",
        left: 0,
        width: "100vw",
        transform: "translateY(-50%)",
        display: "block",
        textAlign: "center",
        bgcolor: "rgba(255, 255, 255, 0.8)",
        zIndex: 1300,
      }}
    >
      <CircularProgress size={60} thickness={3} color="primary" />
    </Box>
  );
}
