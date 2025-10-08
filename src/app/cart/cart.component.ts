import { Component, OnInit } from '@angular/core';
import { Cart, CartItem, Payment } from '../models/models';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  message!: string;
  cartFlag: any;
  displaySpinner = false;
  classname = '';
  usersCart: Cart = {
    id: 0,
    user: this.utilityService.getUser(),
    cartItems: [],
    ordered: false,
    orderedOn: '',
  };

  usersPaymentInfo: Payment = {
    id: 0,
    user: this.utilityService.getUser(),
    paymentMethod: {
      id: 0,
      type: '',
      provider: '',
      available: false,
      reason: '',
    },
    totalAmount: 0,
    shipingCharges: 0,
    amountReduced: 0,
    amountPaid: 0,
    createdAt: '',
  };

  usersPreviousCarts: Cart[] = [];

  constructor(
    private router: Router,
    public utilityService: UtilityService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.cartFlag = false;
    // Get Cart
    this.navigationService
      .getActiveCartOfUser(this.utilityService.getUser().id)
      .subscribe((res: any) => {
        this.usersCart = res;

        // Calculate Payment
        this.utilityService.calculatePayment(
          this.usersCart,
          this.usersPaymentInfo
        );
      });

    // Get Previous Carts
    this.navigationService
      .getAllPreviousCarts(this.utilityService.getUser().id)
      .subscribe((res: any) => {
        this.usersPreviousCarts = res;
      });
  }

  delete(i: number, cartItem : CartItem){
    this.usersCart.cartItems.splice(i,1);
    this.utilityService.removeFromCart(cartItem.product);
    this.utilityService.calculatePayment(
      this.usersCart,
      this.usersPaymentInfo
    );
  }

  placeOrder() {
    this.displaySpinner = true;
      let step = 0;
      let count = timer(0, 3000).subscribe((res) => {
        ++step;
        if (step === 1) {
          const alertDiv = document.createElement('div');
          alertDiv.style.position = 'fixed';
          alertDiv.style.top = '25%';
          alertDiv.style.left = '50%';
          alertDiv.style.transform = 'translate(-50%, -50%)';
          alertDiv.style.padding = '20px';
          alertDiv.style.backgroundColor = '#28a745';
          alertDiv.style.color = '#fff';
          alertDiv.style.borderRadius = '8px';
          alertDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
          alertDiv.style.fontSize = '18px';
          alertDiv.style.textAlign = 'center';
          alertDiv.innerText = 'Processing....';
          document.body.appendChild(alertDiv);

          setTimeout(() => {
            document.body.removeChild(alertDiv);
          }, 3000);
          //this.message = 'Processing Order';
          this.classname = 'text-success';
        }
        if (step === 2) {
          const alertDiv = document.createElement('div');
          alertDiv.style.position = 'fixed';
          alertDiv.style.top = '25%';
          alertDiv.style.left = '50%';
          alertDiv.style.transform = 'translate(-50%, -50%)';
          alertDiv.style.padding = '20px';
          alertDiv.style.backgroundColor = '#28a745';
          alertDiv.style.color = '#fff';
          alertDiv.style.borderRadius = '8px';
          alertDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
          alertDiv.style.fontSize = '18px';
          alertDiv.style.textAlign = 'center';
          alertDiv.innerText = 'Thanks for placing your Requirement.';
          document.body.appendChild(alertDiv);

          setTimeout(() => {
            document.body.removeChild(alertDiv);
          }, 3000);
          this.userOrder();
        }
        if (step === 3) {
          this.displaySpinner = false;
          const alertDiv = document.createElement('div');
          alertDiv.style.position = 'fixed';
          alertDiv.style.top = '25%';
          alertDiv.style.left = '50%';
          alertDiv.style.transform = 'translate(-50%, -50%)';
          alertDiv.style.padding = '20px';
          alertDiv.style.backgroundColor = '#28a745';
          alertDiv.style.color = '#fff';
          alertDiv.style.borderRadius = '8px';
          alertDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
          alertDiv.style.fontSize = '18px';
          alertDiv.style.textAlign = 'center';
          alertDiv.innerText = 'Lodging team will connect you shortly.';
          document.body.appendChild(alertDiv);

          setTimeout(() => {
            document.body.removeChild(alertDiv);
          }, 3000);
        }
        if (step === 4) {
          this.router.navigateByUrl('/home');
          count.unsubscribe();
        }
      });
  }

  userOrder() {
    this.navigationService.placeUserOrder(this.utilityService.getUser().id).subscribe(() => {
    }
    )
  }
}
