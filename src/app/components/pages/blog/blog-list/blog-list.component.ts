import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPost } from 'src/app/core/models';
import { BlogService } from 'src/app/core/services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit{
  blogPosts: BlogPost[] = [];
  filteredPosts: BlogPost[] = [];
  searchQuery: string = '';
  isFiltered: boolean = false;
  showButton: boolean = true;
  loading = false;
  error: string | null = null;

  constructor(private blogService: BlogService, private router: Router) {}


  ngOnInit(): void {
    this.loadTopBlogPosts();
    // this.loadAllBlogPosts();
  }

  navigateToBlogPost(id: string): void {
    this.router.navigate(['/blog', id]);
  }

  loadAllBlogPosts(): void {
    this.loading = true;
    this.error = null;
    this.showButton = false;

    this.blogService.getBlogPosts().subscribe({
      next: (response) => {
        this.blogPosts = response;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load blog posts';
        this.loading = false;
        console.error('Error loading blog posts:', error);
      }
    });
  }

  loadTopBlogPosts(): void {
    this.loading = true;
    this.error = null;

    this.blogService.getBlogPosts().subscribe({
      next: (response) => {
        this.blogPosts = response.slice(0, 3);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load blog posts';
        this.loading = false;
        console.error('Error loading blog posts:', error);
      }
    });
  }

  // Search posts by tag
  searchPosts(): void {
    if (!this.searchQuery.trim()) {
      this.isFiltered = false; // Reset to show all posts if query is empty
      return;
    }

    this.blogService.searchBlogPostsByTag(this.searchQuery).subscribe({
      next: (response) => {
        this.filteredPosts = response;
        this.isFiltered = true; // Show filtered posts
      },
      error: (error) => {
        this.error = 'Failed to filter blog posts';
        console.error('Error filtering blog posts:', error);
      }
    });

    this.searchQuery = ''; // Clear the search input
  }
  
}
