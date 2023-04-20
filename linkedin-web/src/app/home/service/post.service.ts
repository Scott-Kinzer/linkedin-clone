import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import { Observable } from 'rxjs';
import { USER_API } from './user.service';

@Injectable({
  providedIn: 'any',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getSelectedPosts(take: number, skip: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${USER_API}/feed?take=${take}&skip=${skip}`);
  }
}
