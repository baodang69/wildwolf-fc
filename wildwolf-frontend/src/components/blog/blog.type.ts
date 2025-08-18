export type Author = {
  _id: string;
  fullname: string;
  avatar: string;
};

export type Blog = {
  _id: string;
  content: string;
  summary: string;
  title: string;
  author: Author;
  createdAt: string | Date;
  like: number;
  coverImage: string;
  slug: string;
  tags: string[];
  hot: boolean;
};

export type Size = {
  width: number | string;
  height: number | string;
};

export type BlogCardProps = {
  blog: Blog;
  size: Size;
};

export type HotBlogCardProps = {
  blog: Blog;
};
export type SiderBlogCardProps = {
  blog: Blog;
};
