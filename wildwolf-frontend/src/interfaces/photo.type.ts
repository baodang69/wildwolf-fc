export interface Photo {
  _id: string;
  user: User;
  imageUrl: string;
  title: string;
  description: string;
  note: string;
  userLiked: Like[];
  status: Status;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type Status = "SHOW" | "HIDDEN";

export type Like = {
  _id: string;
  fullname: string;
};

export type User = {
  _id: string;
  avatar: string;
  fullname: string;
};

export type PhotoCardProp = {
  photos: Photo[];
};
