import { Component, OnInit } from '@angular/core';
import { BlogPost, Service, Technology, Testimonial } from 'src/app/core/models';
import { ServiceService } from 'src/app/core/services/service.service';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/core/services/blog.service';
import { TestimonialsService } from 'src/app/core/services/testimonials.service';

declare var particlesJS: any; // Declare particlesJS globally

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  
  servicesList: Service[] = [];
  technologiesList: Technology[] = [];
  blogPosts: BlogPost[] = [];
  testimonials: Testimonial[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private serviceService: ServiceService, 
    private blogService: BlogService, 
    private testimonialService: TestimonialsService,
    private router: Router) {}

  ngOnInit(): void {
    particlesJS.load('particles-container', 'assets/particles-config.json', () => {
      console.log('Particles.js config loaded successfully!');
    });

    this.loadServices();
    this.loadBlogPosts();
    this.loadTestimonials();
  }

  loadServices(): void {
    this.loading = true;
    this.error = null;

    this.serviceService.getServices().subscribe({
      next: (response: Service[]) => {
        this.servicesList = response.slice(0, 4);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load services';
        this.loading = false;
        console.log('Error while fetching the services:', error)
      }
    });
  }

  navigateToBlogPost(id: string): void {
    this.router.navigate(['/blog', id]);
  }

  loadBlogPosts(): void {
    this.loading = true;
    this.error = null;

    this.blogService.getBlogPosts().subscribe({
      next: (response) => {
        // Slice the first 3 blog posts
        this.blogPosts = response.slice(0,3);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load blog posts';
        this.loading = false;
        console.error('Error loading blog posts:', error);
      }
    });
  }

  loadTestimonials(): void{
    this.loading = true;
    this.error = null;

    this.testimonialService.getTestimonials().subscribe({
      next: (response: Testimonial[]) => {
        this.testimonials = response;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load testimonials';
        this.loading = false;
        console.error('Error loading testimonials:', error);
      }
    });
  }

}
