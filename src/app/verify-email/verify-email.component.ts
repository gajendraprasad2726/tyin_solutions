import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  message = '';
  verified = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private navigationService: NavigationService,) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.navigationService.verifyEmail(token)
           .subscribe({
            next: res => {
              this.message = res;
              this.verified = true;
              setTimeout(() => this.router.navigate(['/login']), 3000);
            },
            error: err => {
              this.message = 'Verification failed or invalid token.';
              this.verified = false;
            }
          });
      } else {
        this.message = 'Invalid verification link.';
      }
    });
  }
}
