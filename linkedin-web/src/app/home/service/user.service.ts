import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';

export const USER_API = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private userSubject = new BehaviorSubject<User | null>(null);

  getUserInfo() {
    return this.userSubject.asObservable();
  }

  fetchUserInfo() {
    this.http.get<any>(`${USER_API}/user`).subscribe({
      next: (user) => {
        this.userSubject.next(user);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  imageUpload(formData: FormData) {
    return this.http.post<any>(`${USER_API}/user/upload`, formData);
  }
}
