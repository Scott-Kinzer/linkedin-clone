import { FeedPost } from 'src/feed/models/post.interface';
import { Role } from './role';

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: Role;
  posts?: FeedPost[];
}
