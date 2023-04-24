import { User } from 'src/auth/models/user/user.interface';

export type FriendStatus = 'pending' | 'accepted' | 'declined';

export interface FriendConnectionStatus {
  status?: FriendStatus;
}

export interface FriendConnection {
  id?: string;
  creator?: User;
  receiver: User;
  status: FriendStatus;
}
