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
  const hasPlayer = !!player.memberId;

  return (
    <Box
      sx={{
        position: "absolute",
        top: `${player.size.top}%`,
        left: `${player.size.left}%`,
        transform: "translate(-50%, -50%)",
        width: 40,
        height: 40,
        borderRadius: "50%",
        backgroundColor: hasPlayer
          ? player.position === "GK"
            ? "#f44336"
            : "#1976d2"
          : "#aaa",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        cursor: hasPlayer ? "pointer" : "default",
        border:
          isSelected && hasPlayer ? "3px solid #ffd700" : "3px solid white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        transition: "all 0.3s ease",
        zIndex: 10,
        "&:hover": hasPlayer
          ? {
              transform: "translate(-50%, -50%) scale(1.2)",
            }
          : {},
      }}
      onClick={hasPlayer ? onClick : undefined}
      title={
        hasPlayer
          ? `${player.memberId.fullname} (#${player.memberId.number})`
          : undefined
      }
    >
      {hasPlayer ? player.memberId.number : ""}
    </Box>
  );
};
