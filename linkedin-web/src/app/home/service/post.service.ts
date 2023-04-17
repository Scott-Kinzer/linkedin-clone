import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getSelectedPosts(take: number, skip: number): Observable<Post[]> {
    return this.http.get<Post[]>(
      `http://localhost:3000/api/feed?take=${take}&skip=${skip}`
    );
  }
}
