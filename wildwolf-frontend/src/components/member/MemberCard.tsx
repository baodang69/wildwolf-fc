// MemberCard.tsx
import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";

export const MemberCard = ({ 
  players, 
  selectedPlayer 
}: { 
  players: any[]; 
  selectedPlayer: string; 
}) => {
  const player = players.find(p => p._id === selectedPlayer);

  if (!player) {
    return (
      <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            Chọn một cầu thủ để xem thông tin
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Avatar 
            src={player.avatar || '/default-player.jpg'}
            sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
          >
            {player.fullname.charAt(0)}
          </Avatar>
          <Typography variant="h5" gutterBottom>
            {player.fullname}
          </Typography>
          <Typography variant="h3" color="primary">
            #{player.number}
          </Typography>
        </Box>

        <Box>
          <Typography variant="body1" gutterBottom>
            <strong>Vị trí:</strong> {player.position}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Vai trò:</strong> {player.role}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Trạng thái:</strong> {player.status}
          </Typography>
          {player.summary && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              <strong>Ghi chú:</strong> {player.summary}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
