"use client";
import React, { useState } from "react";
import { ResultHelper } from "../../utils/compareResult";
import {
  Card,
  Box,
  Typography,
  Collapse,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import Image from "next/image";
import { MatchCardProps } from "./match.type";

export const MatchesCard: React.FC<MatchCardProps> = ({ matchesData }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const resultHelper = new ResultHelper();

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const formatDate = (d?: string | Date) => {
    if (!d) return "---";
    const date = typeof d === "string" ? new Date(d) : d;
    return date.toLocaleString();
  };

  return (
    <>
      {matchesData.map((match) => (
        <Box key={match._id} sx={{ mb: 2 }}>
          <Typography sx={{ py: 1 }}>
            Ngày diễn ra: {formatDate(match.date)}
          </Typography>
          <Card
            onClick={() => toggleExpand(match._id)}
            sx={{
              mb: 0,
              py: 2,
              px: 2,
              "&:hover": {
                border: "2px solid",
                borderColor: "black",
              },
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Image
                  src="/logo-fc/wildwolf.jpeg"
                  alt="WildWolf FC Logo"
                  width={40}
                  height={40}
                  style={{ borderRadius: "50%" }}
                />
                <Typography sx={{ fontWeight: 700, fontSize: 18 }}>
                  FC Wildwolf
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                    {match.our_goal ?? 0}
                  </Typography>
                  <Typography>-</Typography>
                  <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                    {match.opponent_goal ?? 0}
                  </Typography>
                </Box>
                {/* Outcome chip: win/lose/draw shown inside the card */}
                {(() => {
                  const outcome = resultHelper.compareResult(
                    match.our_goal ?? 0,
                    match.opponent_goal ?? 0
                  );
                  const label =
                    outcome === "win"
                      ? "Thắng"
                      : outcome === "lose"
                      ? "Thua"
                      : "Hòa";
                  const color: any =
                    outcome === "win"
                      ? "success"
                      : outcome === "lose"
                      ? "error"
                      : "default";
                  return <Chip label={label} size="small" color={color} />;
                })()}
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 18 }}>
                  {match.opponent}
                </Typography>
                {match.opponent_avatar ? (
                  <Image
                    src={match.opponent_avatar}
                    alt={`${match.opponent} avatar`}
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%" }}
                  />
                ) : null}
              </Box>
            </Box>
          </Card>

          <Collapse in={expandedId === match._id} timeout="auto" unmountOnExit>
            <CardContent sx={{ backgroundColor: "#fafafa" }}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Chip label={match.status ?? "UNKNOWN"} color="primary" />
                <Typography variant="body2">
                  Sân: {match.stadium ?? "---"}
                </Typography>
              </Stack>

              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Diễn biến
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {match.summary ?? "Không có thông tin"}
              </Typography>

              <Divider sx={{ my: 1 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box sx={{ width: "14%" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Đội nhà — Ghi bàn
                  </Typography>
                  <List dense>
                    {(match.our_scorer ?? []).length === 0 ? (
                      <ListItem>
                        <ListItemText primary="Chưa có" />
                      </ListItem>
                    ) : (
                      (match.our_scorer ?? []).map((s, idx) => (
                        <ListItem key={idx}>
                          <ListItemText
                            primary={`${s.fullname}`}
                            secondary={`Số bàn: ${s.number_of_goal ?? 0}`}
                          />
                        </ListItem>
                      ))
                    )}
                  </List>
                </Box>

                <Box sx={{ width: "14%" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Đội khách — Ghi bàn
                  </Typography>
                  <List dense>
                    {(match.opponent_scorer ?? []).length === 0 ? (
                      <ListItem>
                        <ListItemText primary="Chưa có" />
                      </ListItem>
                    ) : (
                      (match.opponent_scorer ?? []).map((s, idx) => (
                        <ListItem key={idx}>
                          <ListItemText
                            primary={`${s.name}`}
                            secondary={`Số bàn: ${s.number_of_goal ?? 0}`}
                          />
                        </ListItem>
                      ))
                    )}
                  </List>
                </Box>
              </Box>
            </CardContent>
          </Collapse>
        </Box>
      ))}
    </>
  );
};
