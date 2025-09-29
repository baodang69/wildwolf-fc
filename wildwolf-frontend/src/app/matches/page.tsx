"use client";

import { Container } from "@mui/material";
import NextBreadcrumbs from "@/components/ui/Breadcrumb";
import { MatchesCard } from "@/components/matches/MatchesCard";
import { Match } from "@/interfaces/match.type";
import { useState, useEffect } from "react";
import getMatches from "@/api/matches/index";


export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const matchesData = await getMatches();
        setMatches(matchesData);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);
  return (
    <Container maxWidth="lg">
      <Container>
        <NextBreadcrumbs />
        <h1>Lịch thi đấu & Kết quả</h1>
        <MatchesCard matchesData={matches} />
      </Container>
    </Container>
  );
}
