import { Component, OnInit } from '@angular/core';
import { Cart, CartItem, Payment, User } from '../models/models';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { Router } from '@angular/router';
import { Observable, firstValueFrom, timer } from 'rxjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
  sellerUser: any;

  constructor(
    private router: Router,
    public utilityService: UtilityService,
    private navigationService: NavigationService
  ) { }

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

  delete(i: number, cartItem: CartItem) {
    this.usersCart.cartItems.splice(i, 1);
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
        alertDiv.style.backgroundColor = 'maroon';
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
        alertDiv.style.backgroundColor = 'maroon';
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
        alertDiv.style.backgroundColor = 'maroon';
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


  async generateQuotationPDF() {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('QUOTATION', 14, 20);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);
    const user = this.utilityService.getUser();
    const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'Client';
    doc.text('To: ' + fullName, 14, 38);

    // Fetch sellers for each product
    const sellerPromises: Promise<User>[] = this.usersCart.cartItems.map(item =>
      firstValueFrom(this.navigationService.getSellerUserDetails(item.product.id)) as Promise<User>
    );

    const sellers = await Promise.all(sellerPromises);

    // Table data
    const tableBody = this.usersCart.cartItems.map((item, i) => {
      const seller = sellers[i];
      const sellerName = seller?.userOrganizationName || 'Seller';
      const productName = item.product.title || 'Product';
      const qty = item.orderedQty || 0;
      const rate = item.product.price || 0;
      const amount = qty * rate;

      return [
        i + 1,
        productName,
        sellerName,
        qty,
        `Rs ${rate.toFixed(2)}`,
        `Rs ${amount.toFixed(2)}`
      ];
    });

    // Table
    autoTable(doc, {
      startY: 48,
      head: [['#', 'Product', 'Seller', 'Qty', 'Rate', 'Amount']],
      body: tableBody,
      theme: 'grid',
      styles: {
        fontSize: 10,
        textColor: 0,            // Black text
        lineColor: 0,            // Black borders
        lineWidth: 0.1
      },
      headStyles: {
        fillColor: [230, 230, 230],  // Light gray for header
        textColor: 0,
        fontStyle: 'bold'
      },
      alternateRowStyles: { fillColor: [245, 245, 245] }, // Light gray alternate rows
      margin: { left: 14, right: 14 }
    });

    // Total and Notes
    const finalY = (doc as any).lastAutoTable.finalY || 60;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Amount: Rs ${this.usersPaymentInfo.amountPaid.toFixed(2)}`, 14, finalY + 10);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80); // Dark gray
    doc.text(
      'Note: This is a system-generated quotation. Please confirm other details with individual sellers.',
      14,
      finalY + 20,
      { maxWidth: 180 }
    );

    // Save the PDF
    doc.save(`Quotation_${new Date().toISOString().slice(0, 10)}.pdf`);
  }

}


