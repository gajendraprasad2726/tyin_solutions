import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {
  contactForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private navService: NavigationService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.contactForm.valid) {
      this.navService.submitContactForm(this.contactForm.value).subscribe({
        next: (res: any) => {
          this.successMessage = res.message || 'Your message has been sent successfully!';
          this.contactForm.reset();
          this.submitted = false;
        },
        error: err => {
          this.errorMessage = 'Something went wrong. Please try again later.';
          console.error('Contact form submission error:', err);
        }
      });
    }
  }
}
