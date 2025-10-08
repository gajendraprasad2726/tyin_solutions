import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderedQty, Product, Review, User } from '../models/models';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { DatePipe } from '@angular/common';
import { Subscription, timer } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  imageIndex: number = 1;
  product!: Product;
  cartOrderedQty: OrderedQty = {
    qty: 0
  };
  reviewControl = new FormControl('');
  reviewSaved = false;
  showError = false;
  reviewMsg = '';
  private messageTimerSub?: Subscription;
  reviews: Review[] = [];
  orderedQty: number = 0;
  toAdress: string = '';
  toPinCode: number = 0;
  btnState: boolean = true;
  message: string = '';
  isValid: boolean = true;
  isQtyValid: boolean = true; 
  pinCodeError: string = '';
  qtyError: string = '';
  categoryFlag: any;
  buyFlag: boolean = true;
  cartFlag: boolean = true;
  expiryDateFlag!: boolean;
  manufacturerDateFlag!: boolean;
  lastQualityTestedFlag!: boolean;
  isBidPriceEnabled: any = false;
  sellerUser: User | null = null;
  isValidMobile: boolean = true;
  mobileError!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    public utilityService: UtilityService,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let id = params.id;
      this.buyFlag = params['buyFlag'];
      this.cartFlag = params['cartFlag'];

      this.navigationService.getProduct(id).subscribe((res: any) => {
        this.product = res;
        if (this.datePipe.transform(this.product.expiryDate, 'yyyy-MM-dd') === '1900-01-01') {
          this.expiryDateFlag = true;
        } else {
          this.expiryDateFlag = false;
        }
        if (this.datePipe.transform(this.product.manufacturerDate, 'yyyy-MM-dd') === '1900-01-01') {
          this.manufacturerDateFlag = true;
        } else {
          this.manufacturerDateFlag = false;
        }
        if (this.datePipe.transform(this.product.lastQualityTested, 'yyyy-MM-dd') === '1900-01-01') {
          this.lastQualityTestedFlag = true;
        } else {
          this.lastQualityTestedFlag = false;
        }
        this.fetchReviews();
        this.navigationService.getSellerUserDetails(this.product.id).subscribe((res2: any) => {
          this.sellerUser = res2;
          });
        this.navigationService.orderedQty(this.product.id).subscribe((res1: any) => {
          this.cartOrderedQty = res1;
        })
      });
    });
  }

  submitReview() {
    const content = this.reviewControl.value?.trim();
    if (!this.utilityService.isLoggedIn()) {
      this.showMessage('Login required to post a review.', 'error');
      return;
    }

    if (!content) {
      this.showMessage('Review cannot be empty!', 'error');
      return;
    }

    const userId = this.utilityService.getUser().id;
    const productId = this.product.id; // Replace with actual product ID

    this.navigationService.submitReview(userId, productId, content).subscribe({
      next: () => {
        this.reviewControl.setValue('');
        this.showMessage('Review submitted successfully!', 'success');
        this.fetchReviews();
      },
      error: () => this.showMessage('Failed to submit review.', 'error')
    });
  }

  fetchReviews() {
    const productId = this.product.id; // Replace with actual product ID
    this.navigationService.getReviews(productId).subscribe({
      next: (res) => this.reviews = res,
      error: () => console.error('Failed to fetch reviews')
    });
  }

  private showMessage(msg: string, type: 'error' | 'success') {
    this.reviewMsg = msg;
    this.showError = type === 'error';
    this.reviewSaved = type === 'success';

    timer(3000).subscribe(() => {
      this.reviewMsg = '';
      this.showError = false;
      this.reviewSaved = false;
      this.cdr.detectChanges();
    });
  }

  enableBidPrice() {
    this.isBidPriceEnabled = !this.isBidPriceEnabled;
    this.product.bidPrice = 0; // Reset bid price when enabling
  }

  onInput() {
    this.isValidMobile = this.validateMobileNo(this.product.toMobileNo);
    const validPin = this.validatePinCode(this.product.toPinCode);
    const validQty = this.validateQtyCode(
      this.product.orderedQty,
      this.product.quantity,
      this.cartOrderedQty.qty
    );
    const validAddress = this.product.toAddress?.trim().length > 0;

    this.btnState = !(validPin && validQty && this.isValidMobile && validAddress && this.product.orderedQty > 0);
  }

  validateMobileNo(mobile: string): boolean {
    const mobilePattern = /^[6-9]\d{9}$/;
    if (!mobile || !mobilePattern.test(mobile)) {
      this.mobileError = 'Invalid mobile number. Must be 10 digits and start with 6-9.';
      return false;
    }
    this.mobileError = '';
    return true;
  }

  validatePinCode(pin: number): boolean {
    const pinCodePattern = /^[0-9]{6}$/;
    if (!pin || !pinCodePattern.test(pin.toString())) {
      this.pinCodeError = 'Invalid Pin Code. Please enter a 6-digit number.';
      return false;
    }
    this.pinCodeError = '';
    return true;
  }

  validateQtyCode(orderedQty: number, quantity: number, alreadyOrdered: number): boolean {
    const availableQty = quantity - alreadyOrdered;
    if (orderedQty > 0 && orderedQty <= availableQty) {
      this.qtyError = '';
      return true;
    }
    this.qtyError = `Quantity must be between 0 and ${availableQty}.`;
    return false;
  }

}
