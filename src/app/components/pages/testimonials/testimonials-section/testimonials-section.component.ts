import { Component, OnInit } from '@angular/core';
import { Testimonial } from 'src/app/core/models';
import { TestimonialsService } from 'src/app/core/services/testimonials.service';

@Component({
  selector: 'app-testimonials-section',
  templateUrl: './testimonials-section.component.html',
  styleUrls: ['./testimonials-section.component.scss']
})
export class TestimonialsSectionComponent implements OnInit{
  currentIndex = 0;
  testimonials: Testimonial[] = [];
  featuredTestimonials: Testimonial[] = [];
  loading = false;
  error: string | null = null;

  constructor(private testimonialService: TestimonialsService,) {}

  ngOnInit(): void {
    this.loadTestimonials();
  }

  prevTestimonial() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
  
  nextTestimonial() {
    if (this.currentIndex < this.testimonials.length - 1) {
      this.currentIndex++;
    }
  }
  
  setTestimonial(index: number) {
    this.currentIndex = index;
  }  

  loadTestimonials(): void {
    this.loading = true;
    this.error = null;

    this.testimonialService.getTestimonials().subscribe({
      next: (response: Testimonial[]) => {
        this.testimonials = response;
        // Filter only featured testimonials
        this.featuredTestimonials = this.testimonials.filter(testimonial => testimonial.is_featured);
        this.currentIndex = 0; // Reset index when loading new testimonials
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
