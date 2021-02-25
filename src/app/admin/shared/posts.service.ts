import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Post } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.fbDbUrl}posts.json`, post).pipe(
      map((response) => {
        const newPost: Post = {
          ...post,
          id: response.name,
          date: new Date(post.date),
        };
        return newPost;
      })
    );
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fbDbUrl}posts.json`).pipe(
      map((res: { [key: string]: any }) => {
        return Object.keys(res).map((key) => ({
          ...res[key],
          id: key,
          date: new Date(res[key].date),
        }));
      })
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}posts/${id}.json`);
  }
}
