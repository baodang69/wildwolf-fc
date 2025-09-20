"use client";

import { Container } from "@mui/material";
import NextBreadcrumbs from "@/components/ui/Breadcrumb";
import { Box } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { FootballField } from "@/components/member/FootbalField";
import { MemberCard } from "@/components/member/MemberCard";
import Loading from "@/app/loading";
import getFormation from "@/api/informations/index";
import { Detail } from "@/interfaces/formation.type";

export default function MembersPage() {
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");
  const [players, setPlayers] = useState<Detail[]>([]);

  const handlePlayerClick = (playerId: string) => {
    setSelectedPlayer(playerId);
  };

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const formationData = await getFormation();
        setPlayers(formationData.detail);
      } catch (error) {}
    };
    fetchFormation();
  }, []);

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
            <Suspense fallback={<Loading />}>
              <MemberCard players={players} selectedPlayer={selectedPlayer} />
            </Suspense>
          </Box>
        </Box>
      </Container>
    </Container>
  );
}
