// types/match.types.ts
export type OpponentScorer = {
  name: string;
  number_of_goal: number;
};

export type OurScorer = {
  fullname: string;
  number_of_goal: number;
};

export type Match = {
  _id: string;
  date: string | Date;
  opponent: string;
  stadium?: string;
  summary?: string;
  status?: string;
  images?: string[];
  opponent_avatar?: string;
  opponent_goal?: number;
  opponent_scorer?: OpponentScorer[];
  our_goal?: number;
  our_scorer?: OurScorer[];
};

export type MatchCardProps = {
  matchesData: Match[];
};
