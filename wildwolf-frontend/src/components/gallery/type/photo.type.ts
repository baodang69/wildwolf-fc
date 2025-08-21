export type Photo = {
  id: string;
  src: string;
  title: string;
  description: string;
  date: Date;
  like: Like;
  status: Status;
  size: string;
};

export type Status = "SHOW" | "HIDDEN";

export type Like = {
  _id: string;
  fullname: string;
};

export type PhotoCardProp = {
  photos: Photo[];
};
