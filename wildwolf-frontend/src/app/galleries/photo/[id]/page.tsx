"use client";

import { Box, Container, Typography, Paper } from "@mui/material";
import { Photo } from "@/interfaces/photo.type";
import { use, useState, useEffect } from "react";
import { getImageDetail } from "@/api/galleries";

interface PhotoPageProps {
  params: Promise<{ id: string }>;
}

export default function PhotoPage({ params }: PhotoPageProps) {
  const { id } = use(params);
  const [photo, setPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchPhoto = async () => {
      try {
        const data = await getImageDetail(id);
        console.log(data.data);
        setPhoto(data.data);
      } catch (error) {}
    };
    fetchPhoto();
  }, [id]);

  if (!photo) {
    return <Typography>Photo not found</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <img
          src={photo.imageUrl}
          alt={photo.title}
          style={{ width: "100%", height: "auto", borderRadius: 8 }}
        />
        <Box sx={{ mt: 3 }}>
          <Typography variant="h4" gutterBottom>
            {photo.title}
          </Typography>
          <Typography variant="body1">{photo.description}</Typography>
        </Box>
      </Paper>
    </Container>
  );
}
