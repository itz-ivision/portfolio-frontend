import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CONTACT_REASONS, ContactMessage } from 'src/app/core/models';
import { ContactService } from 'src/app/core/services/contact.service';
import { phoneValidator } from 'src/app/core/validators/contact.validator';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit{
  contactForm!: FormGroup;
  contactReasons = CONTACT_REASONS;
  submitting = false;
  submitError: string | null = null;
  submitSuccess = false;

  constructor(
    private fb: FormBuilder, 
    private contactService: ContactService) {
      this.contactForm = this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(100)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [phoneValidator]],
        subject: ['', [Validators.required, Validators.maxLength(255)]],
        reason: ['inquiry', Validators.required],
        other_reason: [''],
        message: ['', Validators.required]
      });
    }

  ngOnInit() {
    // Watch for reason changes to handle other_reason field
    this.contactForm.get('reason')?.valueChanges.subscribe(reason => {
      const otherReasonControl = this.contactForm.get('other_reason');
      if (reason === 'other') {
        otherReasonControl?.setValidators([Validators.required]);
      } else {
        otherReasonControl?.clearValidators();
      }
      otherReasonControl?.updateValueAndValidity();
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.submitting = true;
      this.submitError = null;
      this.submitSuccess = false;

      const formData: ContactMessage = this.contactForm.value;

      this.contactService.sendMessage(formData).subscribe({
        next: () => {
          this.submitting = false;
          this.submitSuccess = true;
          this.contactForm.reset({ reason: 'inquiry' });
        },
        error: (error) => {
          this.submitting = false;
          this.submitError = 'Failed to send message. Please try again later.';
          console.error('Contact form submission error:', error);
        }
      });
    }
  }
}
