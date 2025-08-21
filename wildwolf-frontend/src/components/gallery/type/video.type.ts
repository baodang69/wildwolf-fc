export type Video = {
  id: string;
  src: string;
  thumbnail: string;
  title: string;
  description: string;
  views: number;
  date: string;
};

export type VideoCardProp = {
  videos: Video[];
};
