import { Component, Input, OnInit } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { Product, User, UserBank, UserOrg } from '../models/models';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  products: Product[] = [];
  editFlag: boolean = true;
  message = '';
  isAccountValid: boolean = true;     // Flag for validity
 /* accountNumberPattern: RegExp = /^[0-9]{12}$/;*/
  mobilePattern: RegExp = /^[0-9]{10}$/;
  isValid: boolean = true; 
  @Input() view: 'grid' | 'list' | 'currcartitem' | 'prevcartitem' = 'grid';
  isExpandedProduct: boolean = true;
  isExpandedPD: boolean = true;
  isExpandedBD: boolean = false;
  isExpandedOD: boolean = false;
  buyFlag: any;

  isButton1Disabled: boolean = true;
  isButton2Disabled: boolean = true;
  isButton3Disabled: boolean = true;
  isButton4Disabled: boolean = true;
  isButton5Disabled: boolean = true;
  isButton6Disabled: boolean = true;
  isButton7Disabled: boolean = true;
  isButton8Disabled: boolean = true  ;
  isButton9Disabled: boolean = true  ;
  isButton10Disabled: boolean = true  ;
  isButton11Disabled: boolean = true  ;
  isButton12Disabled: boolean = true  ;

  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    mobile: '',
    password: '',
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
    userId: 0,
  }

  constructor(private navigationService: NavigationService, public utilityService: UtilityService) { }
  
  ngOnInit(): void {
    this.buyFlag = false;
    this.navigationService
      .getActiveUser(this.utilityService.getUser().id)
      .subscribe((res: any) => {
        this.user = res;
      });
    this.navigationService
      .getUserUploadedProducts(this.utilityService.getUser().id)
      .subscribe((res: any) => {
        this.products = res;
      });
    // this.user = this.utilityService.getUser()
  }

  enableEdit(buttonNumber: number): void {
    // Disable all buttons first
    this.isButton1Disabled = true;
    this.isButton2Disabled = true;
    this.isButton3Disabled = true;
    this.isButton4Disabled = true;
    this.isButton5Disabled = true;
    this.isButton6Disabled = true;
    this.isButton7Disabled = true;
    this.isButton8Disabled = true;
    this.isButton9Disabled = true;
    this.isButton10Disabled = true;
    this.isButton11Disabled = true;
    this.isButton12Disabled = true;

    // Enable the chosen button
    if (buttonNumber === 1) {
      this.isButton1Disabled = false;
    } else if (buttonNumber === 2) {
      this.isButton2Disabled = false;
    } else if (buttonNumber === 3) {
      this.isButton3Disabled = false;
    } else if (buttonNumber === 4) {
      this.isButton4Disabled = false;
    } else if (buttonNumber === 5) {
      this.isButton5Disabled = false;
    } else if (buttonNumber === 6) {
      this.isButton6Disabled = false;
    } else if (buttonNumber === 7) {
      this.isButton7Disabled = false;
    } else if (buttonNumber === 8) {
      this.isButton8Disabled = false;
    } else if (buttonNumber === 9) {
      this.isButton9Disabled = false;
    } else if (buttonNumber === 10) {
      this.isButton10Disabled = false;
    } else if (buttonNumber === 11) {
      this.isButton11Disabled = false;
    } else if (buttonNumber === 12) {
      this.isButton12Disabled = false;
    }
  }

  updateToUser(user: User) {
    this.user.userBankAccountNo = this.user.userBankAccountNo ?  this.user.userBankAccountNo : '-';
    this.user.userBankName = this.user.userBankName ? this.user.userBankName : '-';
    this.user.userGSTNo = this.user.userGSTNo ? this.user.userGSTNo : '-';
    this.user.userIFSCCode = this.user.userIFSCCode ? this.user.userIFSCCode : '-';
    this.user.userOrganizationName = this.user.userOrganizationName ? this.user.userOrganizationName : '-';
    this.user.userOrganizationEmailId = this.user.userOrganizationEmailId ? this.user.userOrganizationEmailId : '-';
    this.user.userOrganizationAddress = this.user.userOrganizationAddress ? this.user.userOrganizationAddress : '-';
    this.user.userOrganizationLegalStatus = this.user.userOrganizationLegalStatus ? this.user.userOrganizationLegalStatus : '-';
    this.user.userOrganizationNatureBusiness = this.user.userOrganizationNatureBusiness ? this.user.userOrganizationNatureBusiness : '-';
    this.user.userOrganizationDetails = this.user.userOrganizationDetails ? this.user.userOrganizationDetails : '-';
    this.user.userMobileNoSec = this.user.userMobileNoSec ? this.user.userMobileNoSec : '-';
    this.user.userReEnterBankAccNo = this.user.userReEnterBankAccNo ? this.user.userReEnterBankAccNo : '-';

    this.navigationService.updateToUser(user).subscribe((res: any) => {
      this.message = res.toString();
      setTimeout(() => {
        this.message = '';
      }, 3000);
      this.isButton1Disabled = true;
      this.isButton2Disabled = true;
      this.isButton3Disabled = true;
      this.isButton4Disabled = true;
      this.isButton5Disabled = true;
      this.isButton6Disabled = true;
      this.isButton7Disabled = true;
      this.isButton8Disabled = true;
      this.isButton9Disabled = true;
      this.isButton10Disabled = true;
      this.isButton11Disabled = true;
      this.isButton12Disabled = true;
    });
  }


  toggleExpand(expansionNumber: string) {
    if (expansionNumber === 'Product') {
      this.isExpandedProduct = !this.isExpandedProduct;
    } else if (expansionNumber === 'PD') {
      this.isExpandedPD = !this.isExpandedPD;
    } else if (expansionNumber === 'BD') {
      this.isExpandedBD = !this.isExpandedBD;
    } else if (expansionNumber === 'OD') {
      this.isExpandedOD = !this.isExpandedOD;
    } 
  }

  validateMobileNumber() {
    this.isValid = this.mobilePattern.test(this.user.userMobileNoSec);
  }

  validateAccountNumber() {
    if (this.user.userBankAccountNo != this.user.userReEnterBankAccNo) {
      this.isAccountValid = false;
    } else {
      this.isAccountValid = true;
    }
  }

  autoGrow(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';  // Reset height
    textarea.style.height = textarea.scrollHeight + 'px';  // Set new height
  }
}
