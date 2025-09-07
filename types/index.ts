type Comments = {
  id: number;
  ideaId: number;
  body: string;
  createdAt: Date;
  username: string | null;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Idea = {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  tags: string[];
  stars: number;
  featured: boolean;
  image: string | null;
  category: string | null;
  createdAt: Date;
  username: string | null;
  comments: Comments[];
};
