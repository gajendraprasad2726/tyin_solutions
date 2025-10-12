import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { timer } from 'rxjs';
import { AIReq } from '../models/models';

@Component({
  selector: 'app-post-ai-req',
  templateUrl: './post-ai-req.component.html',
  styleUrls: ['./post-ai-req.component.css']
})
export class PostAiReqComponent implements OnInit {
  postAiReqForm!: FormGroup;
  showLoginPopup = true;
  msg: string = '';
  message: string = '';
  displaySpinner = false;
  constructor(private route: ActivatedRoute, private router: Router, private navigationService: NavigationService, private fb: FormBuilder,) {
}

  ngOnInit(): void {
    this.postAiReqForm = this.fb.group({
      title: ['', []],
      description: ['', []],
      mobileNo: ['', [
          Validators.required,  // Required field
        Validators.pattern(/^\+?[0-9\s\-().]{8,20}$/)
        ]]
    });
  }

  postAiReq() {
    let postAiReq: AIReq = {
      id: 0,
      title: this.Title.value,
      description: this.Description.value,
      mobileNo: this.MobileNo.value,
    };

    this.navigationService.postAiReq(postAiReq).subscribe((res: any) => {
      this.message = res.toString();
      if (this.message === 'AI Requirement Stored') {
        this.processHomePage();
      } else {

      }
    });
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
  get Title() {
    return this.postAiReqForm.get('title') as FormControl;
  }

  get Description() {
    return this.postAiReqForm.get('description') as FormControl;
  }
  get MobileNo() {
    return this.postAiReqForm.get('mobileNo') as FormControl;
  }

  closeLoginPopup() {
    this.showLoginPopup = false;  // Close the error popup
    this.router.navigateByUrl('/integrate-ai');
  }


}
