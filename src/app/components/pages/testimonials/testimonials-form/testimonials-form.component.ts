import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Testimonial } from 'src/app/core/models';
import { TestimonialsService } from 'src/app/core/services/testimonials.service';

@Component({
  selector: 'app-testimonials-form',
  templateUrl: './testimonials-form.component.html',
  styleUrls: ['./testimonials-form.component.scss']
})
export class TestimonialsFormComponent implements OnInit{

  testimonialForm!: FormGroup;
  submitting = false;
  submitError: string | null = null;
  submitSuccess = false;

  constructor(
    private fb: FormBuilder,
    private testimonialService: TestimonialsService
  ) {
    this.testimonialForm = this.fb.group({
      client_name: ['', [Validators.required]], // Client name is required
      client_position: [''], // Optional
      client_company: [''], // Optional
      testimonial_text: ['', [Validators.required]], // Testimonial text is required
      client_photo: ['', [Validators.pattern('https?://.+')]], // URL pattern validation for photo URL
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]] // Rating between 1 and 5 is required
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit() {
    if (this.testimonialForm.valid) {
      this.submitting = true;
      this.submitError = null;
      this.submitSuccess = false;

      const formData: Testimonial = this.testimonialForm.value;

      this.testimonialService.createTestimonial(formData).subscribe({
        next: () => {
          this.submitting = false;
          this.submitSuccess = true;
          this.testimonialForm.reset();
        },
        error: (error) => {  
          this.submitting = false;
          this.submitError = "Failed to submit your review! Please try again."
          console.log("Testimonials submit error : ", error)
        }
      });
    }
  }

}
