import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/home/models/User';
import { USER_API } from 'src/app/home/service/user.service';

export interface FriendRequest {
  id: number;
  creatorId: number;
  receiverId: number;
  status?: FriendConnectionStatus;
}

export type FriendStatus =
  | 'pending'
  | 'accepted'
  | 'declined'
  | 'waiting-for-current-user-response'
  | 'not-sent';

export interface FriendConnectionStatus {
  status?: FriendStatus;
}

@Injectable({
  providedIn: 'any',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getConnectionUser(id: string): Observable<User> {
    return this.http.get<User>(`${USER_API}/user/${id}`);
  }

  getFriendsRequestStatus(
    receiverId: string
  ): Observable<FriendConnectionStatus> {
    return this.http.get(
      `${USER_API}/friend-connection/friend-request/status/${receiverId}`
    );
  }

  addConnectionUser(id: string): Observable<FriendRequest> {
    return this.http.post<FriendRequest>(
      `${USER_API}/friend-connection/friend-request/send/${id}`,
      {}
    );
  }

  getFriendRequests(): Observable<FriendRequest[]> {
    return this.http.get<FriendRequest[]>(
      `${USER_API}/friend-connection/friend-request/me/received-requests`
    );
  }

  respondToFriendRequest(
    id: number,
    statusResponse: 'accepted' | 'declined'
  ): Observable<FriendRequest> {
    return this.http.put<FriendRequest>(
      `${USER_API}/friend-connection/friend-request/response/${id}`,
      { status: statusResponse }
    );
  }
}
