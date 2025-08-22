// app/gallery/photo/[id]/page.tsx
import { Box, Container, Typography, Paper } from "@mui/material";
import { Photo } from "@/components/gallery/type/photo.type";

interface PhotoPageProps {
  params: { id: string };
}

const getPhotoById = (id: string): Photo | null => {
  const photos: Photo[] = [
    {
      id: "2",
      src: "/images/team-photo-1.jpg",
      title: "Đội hình chính thức 2025",
      description:
        "Ảnh đội hình chính thức mùa giải 2025 với đầy đủ các thành viên và ban huấn luyện. Một mùa giải đầy hứa hẹn với đội hình mạnh mẽ.",
      date: new Date("2025-01-15"),
      like: {
        _id: "like_001",
        fullname: "Nguyễn Văn An",
      },
      status: "SHOW",
      size: "213KB",
    },
  ];

  return photos.find((photo) => photo.id === id) || null;
};

export default function PhotoPage({ params }: PhotoPageProps) {
  const photo = getPhotoById(params.id);

  if (!photo) {
    return <Typography>Photo not found</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <img
          src={photo.src}
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
