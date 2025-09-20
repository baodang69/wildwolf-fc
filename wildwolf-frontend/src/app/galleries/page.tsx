"use client";
import { useState } from "react";
import { Box, Tabs, Tab, Container, Paper } from "@mui/material";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { PhotosTab } from "@/components/gallery/PhotosTab";
import { VideosTab } from "@/components/gallery/VideosTab";
import NextBreadcrumbs from "@/components/ui/Breadcrumb";
import { Photo } from "@/interfaces/photo.type";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`team-media-tabpanel-${index}`}
      aria-labelledby={`team-media-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `team-media-tab-${index}`,
    "aria-controls": `team-media-tabpanel-${index}`,
  };
};

export default function TeamMediaPage() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setActiveTab(newValue);
  };

  const photosData: Photo[] = [
    {
      id: "1",
      src: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ1mUs9hZvSUOevwBwYVh43am5dpIJhSZavvYWr6soJEI6GK1NYvBdHtUGaiDwGY2iQ9WoHxWDX9HFmI7lXSU9r2wlIk6DoUcC3cTwhFw",
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
  ];

  const videosData = [
    {
      id: "1",
      src: "/videos/team-highlight-1.mp4",
      thumbnail: "/images/video-thumb-1.jpg",
      title: "Highlights trận đấu vòng 1",
      description: "Những pha bóng đẹp nhất trong trận thắng 3-1",
      views: 1250,
      date: "2025-01-15",
    },
    {
      id: "2",
      src: "697kNwfU-4M&list=PLC3y8-rFHvwhIEc4I4YsRz5C7GOBnxSJY&index=30",
      thumbnail: "/images/video-thumb-2.jpg",
      title: "Buổi tập luyện chiến thuật",
      description: "Chuẩn bị cho trận đấu quan trọng sắp tới",
      views: 890,
      date: "2025-01-10",
    },
    {
      id: "3",
      src: "https://www.youtube.com/watch?v=9rVGGySuPLc",
      thumbnail: "/images/video-thumb-3.jpg",
      title: "Phỏng vấn HLV trưởng",
      description: "Chia sẻ về chiến thuật và mục tiêu mùa giải",
      views: 2100,
      date: "2025-01-08",
    },
    {
      id: "4",
      src: "/videos/skills-training.mp4",
      thumbnail: "/images/video-thumb-4.jpg",
      title: "Luyện kỹ thuật cơ bản",
      description: "Các bài tập rèn luyện kỹ thuật cho cầu thủ trẻ",
      views: 1560,
      date: "2025-01-05",
    },
    {
      id: "5",
      src: "/videos/match-analysis.mp4",
      thumbnail: "/images/video-thumb-5.jpg",
      title: "Phân tích trận đấu",
      description: "Đánh giá chiến thuật và điểm mạnh yếu",
      views: 780,
      date: "2025-01-03",
    },
    {
      id: "6",
      src: "/videos/team-spirit.mp4",
      thumbnail: "/images/video-thumb-6.jpg",
      title: "Tinh thần đội nhóm",
      description: "Những khoảnh khắc gắn kết của đội bóng",
      views: 2890,
      date: "2025-01-01",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Container>
        <NextBreadcrumbs />
        <h1>Thư viện</h1>
        <Paper elevation={2} sx={{ borderRadius: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              centered
              sx={{
                "& .MuiTab-root": {
                  minHeight: 72,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                },
              }}
            >
              <Tab
                icon={<PhotoLibraryIcon />}
                iconPosition="start"
                label="Ảnh đội bóng"
                {...a11yProps(0)}
              />
              <Tab
                icon={<VideoLibraryIcon />}
                iconPosition="start"
                label="Video đội bóng"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>

          <TabPanel value={activeTab} index={0}>
            <PhotosTab photos={photosData} />
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <VideosTab videos={videosData} />
          </TabPanel>
        </Paper>
      </Container>
    </Container>
  );
}
