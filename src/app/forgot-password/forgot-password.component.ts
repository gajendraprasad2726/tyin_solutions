import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string = '';
  message: string = '';
  errorMessage: string = '';
  loading: boolean = false;
  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
  }

  sendResetLink() {
    this.errorMessage = '';
    this.message = '';
    if (!this.email) {
      this.errorMessage = 'Please enter your email';
      return;
    }

    this.loading = true;
    this.navigationService.forgotPassword(this.email)
      .subscribe({
        next: (res) => {
          this.message = res.message || 'If your email is registered, you will receive a reset link.';
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Something went wrong';
          this.loading = false;
        }
      });
  }
}
