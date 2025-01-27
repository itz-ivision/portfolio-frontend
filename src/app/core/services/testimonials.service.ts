import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Testimonial, ApiResponse } from '../models';

@Injectable({
  providedIn: 'root'})
export class TestimonialsService {
  constructor(private apiService: ApiService) {}

  getTestimonial(id: string): Observable<ApiResponse<Testimonial>> {
    return this.apiService.get<ApiResponse<Testimonial>>(`/testimonials/testimonials/${id}`);
  }

  getTestimonials(): Observable<Testimonial[]> {
    return this.apiService.get<Testimonial[]>('/testimonials/');
  }

  createTestimonial(message: Testimonial): Observable<Testimonial> {
    return this.apiService.post<Testimonial>('/testimonials/', message);
  }

}