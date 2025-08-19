"use client";

import { Container } from "@mui/material";
import NextBreadcrumbs from "@/components/ui/Breadcrumb";
import { Box } from "@mui/material";
import { useState } from "react";
import { FootballField } from "@/components/member/FootbalField";
import { MemberCard } from "@/components/member/MemberCard";

export default function MembersPage() {
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");

  const players = [
    {
      _id: "688dc7153d1f0fc7110060fd",
      fullname: "Trần Đức Anh Tuấn",
      avatar: "",
      dob: "2003-12-31T17:00:00.000+00:00",
      number: 1,
      role: "CAPTAIN" as const,
      summary: "toi la thg oc cho",
      position: "GK" as const,
      status: "PLAYING" as const,
    },
    {
      _id: "688dc7153d1f0fc7110060fe",
      fullname: "Nguyễn Văn A",
      avatar: "",
      dob: "2001-05-15T17:00:00.000+00:00",
      number: 2,
      role: "PLAYER" as const,
      summary: "Hậu vệ phải",
      position: "DF" as const,
      status: "PLAYING" as const,
    },
  ];

  const handlePlayerClick = (playerId: string) => {
    setSelectedPlayer(playerId);
  };

  return (
    <Container maxWidth="lg">
      <Container>
        <NextBreadcrumbs />
        <h1>Đội bóng</h1>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
              lg: "1fr 1fr",
            },
            gap: 4,
            height: "80vh",
            alignItems: "stretch",
            marginY: 5,
          }}
        >
          <Box sx={{ height: "100%" }}>
            <FootballField
              players={players}
              onPlayerClick={handlePlayerClick}
              selectedPlayer={selectedPlayer}
            />
          </Box>
          <Box sx={{ height: "100%" }}>
            <MemberCard players={players} selectedPlayer={selectedPlayer} />
          </Box>
        </Box>
      </Container>
    </Container>
  );
}
