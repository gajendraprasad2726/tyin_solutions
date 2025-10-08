import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, map, window } from 'rxjs';
import { Cart, Payment, Product, User } from '../models/models';
import { NavigationService } from './navigation.service';
import { HttpClient } from '@angular/common/http';
import { GOOGLE_MAPS_API_KEY } from '../config';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  changeCart = new Subject();
  distance: number | null = null;
  prevamount!: number;
  constructor(
    private navigationService: NavigationService,
    private jwt: JwtHelperService,
    private http: HttpClient,
    private router: Router
  ) { }


  setToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  getUser(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload: any = JSON.parse(atob(token.split('.')[1]));

      return {
        id: payload.id,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        mobile: payload.mobile,
        address: payload.address,
        createdAt: payload.createdAt,
        modifiedAt: payload.modifiedAt,
        userOrganizationName: payload.userOrganizationName,
        userOrganizationEmailId: payload.userOrganizationEmailId,
        userOrganizationAddress: payload.userOrganizationAddress,
        userOrganizationLegalStatus: payload.userOrganizationLegalStatus,
        userOrganizationNatureBusiness: payload.userOrganizationNatureBusiness,
        userOrganizationDetails: payload.userOrganizationDetails,
        userGSTNo: payload.userGSTNo,
        userMobileNoSec: payload.userMobileNoSec,
        userBankName: payload.userBankName,
        userBankAccountNo: payload.userBankAccountNo,
        userReEnterBankAccNo: payload.userReEnterBankAccNo,
        userIFSCCode: payload.userIFSCCode,
        userId: payload.userId
      };
    } catch (e) {
      this.logoutUser();
      return null;
    }
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload: any = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      return exp && exp > Math.floor(Date.now() / 1000); // Expiry check
    } catch (e) {
      return false;
    }
  }

  logoutUser(): void {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  addToCart(product: Product) {
    let productid = product.id;
    let userid = this.getUser().id;
    let orderedQty = product.orderedQty;
    let toAddress = product.toAddress;
    let toPinCode = product.toPinCode;
    let toMobileNo = product.toMobileNo;
    let bidPrice = product.bidPrice ? product.bidPrice : 0;

    this.navigationService.addToCart(userid, productid, orderedQty, toAddress, toPinCode, toMobileNo, bidPrice).subscribe((res: any) => {
      if (res.toString() === 'inserted') this.changeCart.next(1);
    });
  }



  calculatePayment(cart: Cart, payment: Payment) {
    payment.totalAmount = 0;
    payment.amountPaid = 0;
    payment.amountReduced = 0;
    payment.shipingCharges = 0;

    for (let cartitem of cart.cartItems) {
      if (cartitem.bidPrice === 0 || cartitem.bidPrice === null) {
        payment.totalAmount += cartitem.product.price * cartitem.orderedQty;
      }
      else {
        payment.totalAmount += cartitem.bidPrice * cartitem.orderedQty;
      }
      }
    payment.amountPaid = payment.totalAmount + payment.shipingCharges;
    }
  //}

  calculatePreviousPayment(cart: Cart) {
    this.prevamount = 0;
    for (let cartitem of cart.cartItems) {
      if (cartitem.bidPrice === 0 || cartitem.bidPrice === null) {
        this.prevamount += cartitem.product.price * cartitem.orderedQty;
      }
      else {
        this.prevamount += cartitem.bidPrice * cartitem.orderedQty;
      }
    }
    return this.prevamount;
  }

  removeFromCart(product: Product) {
    let productid = product.id;
    let userid = this.getUser().id;

    this.navigationService.removeFromCart(userid, productid).subscribe((res: any) => {
      if (res.toString() === 'deleted') this.changeCart.next(1);
    });
  }

  isAdminEmail(): boolean {
    const u = this.getUser();
    return u?.email?.toLowerCase() === 'gajendraprasad2726@gmail.com'; 
  }
}
