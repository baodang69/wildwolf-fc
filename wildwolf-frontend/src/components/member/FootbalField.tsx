// FootballField.tsx
import { Box } from "@mui/material";
import { PlayerCardProp } from "./member.type";
import Image from "next/image";
import { PlayerNode } from "./PlayerNode";

export const FootballField = ({
  players,
  onPlayerClick,
  selectedPlayer, 
}: {
  players: PlayerCardProp["players"]; 
  onPlayerClick: (playerId: string) => void; 
  selectedPlayer?: string; 
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: 0,
        height: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="img"
        src="/football-field/footbal_field.jpg"
        alt="football-field"
        sx={{
          position: "absolute",
          top: 0,
          transform: "rotate(90deg)",
          height: "100%",
          width: "auto",
          objectFit: "cover",
          zIndex: -1,
        }}
      />

      {/* Player nodes */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
        }}
      >
        {players.map((player) => (
          <PlayerNode
            key={player._id}
            player={player}
            isSelected={selectedPlayer === player._id}
            onClick={() => onPlayerClick(player._id)}
          />
        ))}
      </Box>
    </Box>
  );
};
