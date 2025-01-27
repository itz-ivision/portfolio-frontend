import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { BlogPost, ApiResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private apiService: ApiService) {}

  getBlogPost(id: string): Observable<BlogPost> {
    return this.apiService.get<BlogPost>(`/blog/post/${id}`);
  }

  getBlogPosts(): Observable<BlogPost[]> {
    return this.apiService.get<BlogPost[]>('/blog/posts');
  }

  // Search blog posts by tag (using query parameter 'search')
  searchBlogPostsByTag(tag: string): Observable<BlogPost[]> {
    return this.apiService.getWithParams<BlogPost[]>('/blog/posts', {
      search: tag
    });
  }
}