import { Component, ComponentRef, ElementRef, EventEmitter, OnInit, Output, Type, ViewChild, ViewContainerRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output() submitEvent: EventEmitter<void> = new EventEmitter<void>();
  loginForm!: FormGroup;
  submitted: boolean | undefined;
  message = '';
  forgotPasswordMsg: string = '';
  messageType: boolean | undefined;
  isSuccessMessageVisible = true;
  clickedLogInButton: boolean = false;
  @ViewChild('modalTitle') modalTitle!: ElementRef;
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  @ViewChild('generalmodal')
  modalElement!: ElementRef; // Get reference to the modal element
  showLoginPopup = true;
  displaySpinner = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private navigationService: NavigationService,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  login() {
    this.message = '';
    this.clickedLogInButton = false;
    this.navigationService
      .loginUser(this.Email.value, this.PWD.value)
      .subscribe({
        next: (res: any) => {
        if (res.toString() !== 'invalid') {
          this.messageType = true;
          this.message = 'Logged In Successfully! 🎉'; 
          this.utilityService.setToken(res.toString());
          console.log(this.utilityService.getUser());
          this.submitted = true;
          this.clickedLogInButton = true;
          this.processHomePage();
        }
        },
        error: (err) => {
          this.messageType = false;
          this.clickedLogInButton = true;

          if (err.status === 401) {
            const errorMessage = err.error;

            if (errorMessage === 'Email not verified') {
              this.message = 'Please verify your email before logging in.';
            } else {
              this.message = 'Invalid Credentials!';
            }
          } else {
            this.message = 'Something went wrong. Please try again later.';
          }
          console.error('Login error:', err);
        }
      });
  }

  processHomePage() {
    this.displaySpinner = true;
    let step = 0;
    let count = timer(0, 2000).subscribe((res) => {
      ++step;
      if (step === 1) {
      }
      if (step === 2) {
        this.router.navigateByUrl('/home');
        count.unsubscribe();
      }
    });
  }

  closeLoginPopup() {
    this.showLoginPopup = false;  // Close the error popup
    this.router.navigateByUrl('/home');
  }

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get PWD(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }

}
