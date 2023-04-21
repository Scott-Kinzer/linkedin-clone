import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

export const USER_API = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<User> {
    return this.http.get<any>(`${USER_API}/user`);
  }
}
