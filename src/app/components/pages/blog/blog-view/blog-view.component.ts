import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from 'src/app/core/models';
import { BlogService } from 'src/app/core/services/blog.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent {
  blogPost: BlogPost | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadBlogPost(id);
    }
  }

  private loadBlogPost(id: string): void {
    this.loading = true;
    this.error = null;

    this.blogService.getBlogPost(id).subscribe({
      next: (response) => {
        this.blogPost = response;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load blog post';
        this.loading = false;
        console.error('Error loading blog post:', error);
      }
    });
  }
}
