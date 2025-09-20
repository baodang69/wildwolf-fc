export interface MatchRequestData {
  opponent: string;
  appointmenttime: string;
  stadium: string;
  opponent_club: string;
  opponent_logo?: string;
  note?: string;
}

export interface FormData {
  opponent_club: string;
  opponent_logo: string;
  matchDate: string;
  matchTime: string; 
  stadium: string;
  note: string;
}