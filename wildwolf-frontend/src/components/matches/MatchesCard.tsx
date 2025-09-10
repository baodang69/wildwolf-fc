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
import { MatchCardProps } from "./type/match.type";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import LocationOnIcon from "@mui/icons-material/LocationOn";

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
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr auto 1fr",
                  sm: "1fr auto 1fr",
                },
                alignItems: "center",
                gap: { xs: 1, sm: 2 },
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1, sm: 2 },
                  justifyContent: "flex-start",
                }}
              >
                <Image
                  src="/logo-fc/wildwolf.jpeg"
                  alt="WildWolf FC Logo"
                  width={40}
                  height={40}
                  style={{ borderRadius: "50%" }}
                />
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: 14, sm: 16, md: 18 },
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  FC Wildwolf
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                  minWidth: "120px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    sx={{
                      fontSize: { xs: 20, sm: 24, md: 28 },
                      fontWeight: 700,
                      minWidth: "30px",
                      textAlign: "center",
                    }}
                  >
                    {match.our_goal ?? 0}
                  </Typography>
                  <Typography
                    sx={{ fontSize: { xs: 16, sm: 18, md: 20 }, mx: 1 }}
                  >
                    -
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: 20, sm: 24, md: 28 },
                      fontWeight: 700,
                      minWidth: "30px",
                      textAlign: "center",
                    }}
                  >
                    {match.opponent_goal ?? 0}
                  </Typography>
                </Box>
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

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1, sm: 2 },
                  justifyContent: "flex-end",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: 14, sm: 16, md: 18 },
                    display: { xs: "none", sm: "block" },
                    textAlign: "right",
                  }}
                >
                  {match.opponent}
                </Typography>
                {match.opponent_avatar ? (
                  <Image
                    src={match.opponent_avatar}
                    alt={`${match.opponent} avatar`}
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%" }}
                    objectFit="cover"
                  />
                ) : (
                  <Image
                    src={"/default_logo_club/default_logo_club.png"}
                    alt={`${match.opponent} avatar`}
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%" }}
                    objectFit="cover"
                  />
                )}
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
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <LocationOnIcon fontSize="small" />
                  <Typography variant="body2">
                    {match.stadium ?? "---"}
                  </Typography>
                </Box>
              </Stack>

              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Diễn biến
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {match.summary ?? "Không có thông tin"}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Scorers Section */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: { xs: 2, md: 4 },
                  mt: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      mb: 1.5,
                      color: "primary.main",
                      borderBottom: "2px solid",
                      borderColor: "primary.main",
                      pb: 0.5,
                    }}
                  >
                    FC Wildwolf
                  </Typography>
                  {(match.our_scorer ?? []).length === 0 ? (
                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: "grey.50",
                        borderRadius: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Không có bàn thắng
                      </Typography>
                    </Box>
                  ) : (
                    <Stack spacing={1}>
                      {(match.our_scorer ?? []).map((s, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            p: 1.5,
                            backgroundColor: "success.50",
                            borderRadius: 1,
                            border: "1px solid",
                            borderColor: "success.200",
                          }}
                        >
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {s.id.fullname}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <SportsSoccerIcon fontSize="small" />
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 700,
                                minWidth: "20px",
                                textAlign: "center",
                              }}
                            >
                              {s.number_of_goal ?? 0}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  )}
                </Box>

                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      mb: 1.5,
                      borderBottom: "2px solid",
                      pb: 0.5,
                    }}
                  >
                    {match.opponent}
                  </Typography>
                  {(match.opponent_scorer ?? []).length === 0 ? (
                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: "grey.50",
                        borderRadius: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Không có bàn thắng
                      </Typography>
                    </Box>
                  ) : (
                    <Stack spacing={1}>
                      {(match.opponent_scorer ?? []).map((s, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            p: 1.5,
                            backgroundColor: "error.50",
                            borderRadius: 1,
                            border: "1px solid",
                            borderColor: "error.200",
                          }}
                        >
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {s.name}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <SportsSoccerIcon fontSize="small" />
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 700,
                                minWidth: "20px",
                                textAlign: "center",
                              }}
                            >
                              {s.number_of_goal ?? 0}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Collapse>
        </Box>
      ))}
    </>
  );
};
