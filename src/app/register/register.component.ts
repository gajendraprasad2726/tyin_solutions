import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { User } from '../models/models';
import { NavigationService } from '../services/navigation.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  invaildRPWD: boolean = false;
  message = '';
  @Output() submitEvent: EventEmitter<void> = new EventEmitter<void>();
  clickedRegisterButton: boolean =  false;
  messageType!: boolean;
  showRegisterPopup = true;
  displaySpinner = false;
  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z].*'),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z].*'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      mobile: ['',
        [
          Validators.required,
        this.mobileNumberValidator()
        ],
        ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
      rePassword: ['',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
      ],
      ],
    },
      { validators: this.passwordMatchValidator() }
    );
  }

  register() {
    // Reset message flags before making the request
    this.message = '';
    this.messageType = false;
    this.clickedRegisterButton = false;
    this.displaySpinner = true;

    const user: User = {
      id: 0,
      firstName: this.FirstName.value,
      lastName: this.LastName.value,
      email: this.Email.value,
      address: this.Address.value,
      mobile: this.Mobile.value,
      password: this.Password.value,
      createdAt: '',
      modifiedAt: '',
      userOrganizationName: '',
      userOrganizationEmailId: '',
      userOrganizationAddress: '',
      userOrganizationLegalStatus: '',
      userOrganizationNatureBusiness: '',
      userOrganizationDetails: '',
      userGSTNo: '',
      userMobileNoSec: '',
      userBankName: '',
      userBankAccountNo: '',
      userReEnterBankAccNo: '',
      userIFSCCode: '',
      userId: 0
    };

    this.navigationService.registerUser(user).subscribe({
      next: (res: any) => {
        this.clickedRegisterButton = true;
        this.message = res.message || 'Unexpected response from server';
        this.messageType = res.success;
      },
      error: (error) => {
        // Handle server errors with more detail
        this.clickedRegisterButton = true;
        this.message = error?.error?.message || 'Server error. Please try again later.';
        this.messageType = false;
        console.error('Registration error:', error);
      }
      });
  }

  processFailPage() {
    this.displaySpinner = false;
    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 3000);
  }

  processHomePage() {
    setTimeout(() => {
      this.message = 'An email has been sent to your registered Email Address.';
    }, 1000);
    setTimeout(() => {
      this.message = 'Kindly verify it before logging in.';
    }, 2500);
    setTimeout(() => {
      this.displaySpinner = false;
      this.router.navigateByUrl('/home');
    }, 4000);
  }

  closeRegisterPopup() {
    this.showRegisterPopup = false;  // Close the error popup
    this.router.navigateByUrl('/home');
  }

  //#region Getters
  get FirstName(): FormControl {
    return this.registerForm.get('firstName') as FormControl;
  }
  get LastName(): FormControl {
    return this.registerForm.get('lastName') as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get Address(): FormControl {
    return this.registerForm.get('address') as FormControl;
  }
  get Mobile(): FormControl {
    return this.registerForm.get('mobile') as FormControl;
  }
  get Password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get RePassword(): FormControl {
    return this.registerForm.get('rePassword') as FormControl;
  }
  //#endregion

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const rePassword = control.get('rePassword');
      // If either field is not filled, return null (valid)
      if (!password || !rePassword) {
        return null;
      }
      // If passwords match, return null (valid)
      return password.value === rePassword.value ? null : { passwordMismatch :  true };
    };
  }

  mobileNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const mobileNumberRegex = /^[0-9]{10}$/; // 10-digit number
      if (control.value && !mobileNumberRegex.test(control.value)) {
        return { invalidMobile: 'Mobile number must be 10 digits' };
      }
      return null;  // valid mobile number
    };
  }
 }
