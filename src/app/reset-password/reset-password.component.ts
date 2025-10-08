import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email: string = '';
  token: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  message: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private navigationService: NavigationService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      this.token = params['token'] || '';
    });
  }
  resetPassword() {
    this.errorMessage = '';
    this.message = '';
    if (!this.email || !this.token) {
      this.errorMessage = 'Invalid password reset request.';
      return;
    }
    if (!this.newPassword || !this.confirmNewPassword) {
      this.errorMessage = 'Please enter and confirm your new password.';
      return;
    }
    if (this.newPassword !== this.confirmNewPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.loading = true;
    this.navigationService.resetPassword(this.email, this.token, this.newPassword)
      .subscribe({
        next: (res) => {
          this.message = res.message || 'Password reset successful. You can now login.';
          this.loading = false;
          // Optionally redirect to login page after a delay
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Something went wrong';
          if (err.error?.errors) {
            this.errorMessage += ' ' + err.error.errors.join(' ');
          }
          this.loading = false;
        }
      });
  }
}
