import { Box } from "@mui/material";

export const PlayerNode = ({
  player,
  isSelected,
  onClick,
}: {
  player: any;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 40,
        height: 40,
        borderRadius: "50%",
        backgroundColor: player.position === "GK" ? "#f44336" : "#1976d2",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        cursor: "pointer",
        border: isSelected ? "3px solid #ffd700" : "3px solid white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        transition: "all 0.3s ease",
        zIndex: 10,
        "&:hover": {
          transform: "translate(-50%, -50%) scale(1.2)",
        },
      }}
      onClick={onClick}
      title={`${player.fullname} (#${player.number})`}
    >
      {player.number}
    </Box>
  );
};
