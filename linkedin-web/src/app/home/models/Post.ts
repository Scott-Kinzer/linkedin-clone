export interface Post {
  id: number;
  body: string;
  createdAt: Date;
  author: {
    firstName: string;
    lastName: string;
    imagePath: string;
    id: string;
  };
}
