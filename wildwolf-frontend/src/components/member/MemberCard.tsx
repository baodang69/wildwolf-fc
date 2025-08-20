import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import Image from "next/image";

export const MemberCard = ({
  players,
  selectedPlayer,
}: {
  players: any[];
  selectedPlayer: string;
}) => {
  const player = players.find((p) => p._id === selectedPlayer);

  if (!player) {
    return (
      <Card
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={"/logo-fc/wildwolf.jpeg"}
              width={100}
              height={100}
              alt="logo-fc"
              style={{
                borderRadius: "50%",
                marginTop: 50,
                marginBottom: 50,
              }}
            />
          </Box>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            FC Sói hoang
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Thành lập năm 2024 - Đá thì ít, lậu thì nhiều
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 3,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            mb: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: 300,
              height: 300,
              borderRadius: 2,
              overflow: "hidden",
              mb: 2,
              borderColor: "primary.main",
              boxShadow: 2,
            }}
          >
            <Image
              src={player.avatar || "/default-player.jpg"}
              fill
              alt={`${player.fullname} avatar`}
              style={{
                objectFit: "cover",
              }}
            />
          </Box>

          <Chip
            label={`#${player.number}`}
            color="primary"
            sx={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              mb: 1,
              px: 2,
              py: 1,
            }}
          />

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: "text.primary",
            }}
          >
            {player.fullname}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                  fontWeight: "medium",
                }}
              >
                Vị trí
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                {player.position}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                  fontWeight: "medium",
                }}
              >
                Vai trò
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                {player.role}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                textTransform: "uppercase",
                fontSize: "0.75rem",
                fontWeight: "medium",
                mb: 0.5,
                display: "block",
              }}
            >
              Trạng thái
            </Typography>
            <Chip
              label={player.status}
              size="small"
              color={
                player.status === "Hoạt động"
                  ? "success"
                  : player.status === "Tạm nghỉ"
                  ? "warning"
                  : "default"
              }
              variant="outlined"
            />
          </Box>

          {player.summary && (
            <Box
              sx={{
                mt: "auto",
                p: 2,
                bgcolor: "grey.50",
                borderRadius: 1,
                border: "1px solid",
                borderColor: "grey.200",
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                  fontWeight: "medium",
                  mb: 0.5,
                  display: "block",
                }}
              >
                Ghi chú
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontStyle: "italic",
                  lineHeight: 1.4,
                }}
              >
                {player.summary}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
