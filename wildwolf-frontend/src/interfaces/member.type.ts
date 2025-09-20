export interface Player {
  _id: string;
  fullname: string;
  avatar?: string;
  dob?: string; // ISO string format
  number?: number;
  role: string;
  position?: string;
  status: string;
  summary?: string;
}

export interface Detail {
  size: {
    top: number;
    left: number;
  };
  position: string;
  memberId: Player; // nested object Player
}

export type PlayerCardProp = {
  players: Detail[];
};

export type MemberCardProps = { selectedPlayer?: string };
