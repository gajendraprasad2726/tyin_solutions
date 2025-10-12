import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-quotation-mobile-number',
  templateUrl: './quotation-mobile-number.component.html',
  styleUrls: ['./quotation-mobile-number.component.css']
})
export class QuotationMobileNumberComponent implements OnInit {
  mobileForm: FormGroup;
  quotationTitle: string = '';
  showLoginPopup = true;
  msg: string = '';
  displaySpinner = false;
  constructor(private route: ActivatedRoute, private router: Router, private navigationService: NavigationService,) {
    // Initialize the form group
    this.mobileForm = new FormGroup({
      mobileNumber: new FormControl('', [
        Validators.required,  // Required field
        Validators.pattern(/^\+?[0-9\s\-().]{8,20}$/)
      ])
    });
}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.quotationTitle = params['quotationTitle'];
    });
  }

  onSubmit() {
    if (this.mobileForm.valid) {
      this.navigationService
        .quotationMobileNo(this.quotationTitle, this.MobileNumber.value)
        .subscribe((res: any) => {
          this.processHomePage();
          console.log('Mobile No Submitted:', res);
        });
    } else {
      console.log('Mobile No not valid');
    }
  }

  processHomePage() {
    this.displaySpinner = true;
    let step = 0;
    let count = timer(0, 3000).subscribe((res) => {
      ++step;
      if (step === 1) {
        this.msg = "Thanks for reaching out! We'll get back to you shortly!";
      }
      if (step === 2) {
        this.router.navigateByUrl('/integrate-ai');
        count.unsubscribe();
      }
    });
  }

  // Getter for easy access to the mobileNumber control
  get MobileNumber() {
    return this.mobileForm.get('mobileNumber') as FormControl;
  }

  closeLoginPopup() {
    this.showLoginPopup = false;  // Close the error popup
    this.router.navigateByUrl('/integrate-ai');
  }



}

