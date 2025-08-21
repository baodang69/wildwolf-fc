export type Player = {
  _id: string;
  fullname: string;
  avatar?: string;
  dob?: string;
  number?: number;
  role: string;
  position?: string;
  status: string;
  summary?: string;
};

export type PlayerCardProp = {
  players: Player[];
};

export type MemberCardProps = { selectedPlayer?: string };
