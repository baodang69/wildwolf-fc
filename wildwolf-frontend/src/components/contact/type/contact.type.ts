interface MatchRequestFormData {
  teamName: string;
  logo: string | null;
  matchDate: string;
  matchTime: string;
  venue: string;
  notes: string;
}

interface ContactCardProps {
  onSubmit?: (data: MatchRequestFormData) => void;
}