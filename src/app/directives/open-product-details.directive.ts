import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[OpenProductDetails]',
})
export class OpenProductDetailsDirective {
  @Input() buyFlag: any;
  @Input() cartFlag: any;
  @Input() productId: number = 0;
  @HostListener('click') openProductDetails() {
    window.scrollTo(0, 0);

    if(this.buyFlag===1){
      this.router.navigate(['/product-details'], {
        queryParams: {
          id: this.productId,
          cartFlag: this.cartFlag
        },
      });
    }else{
      this.router.navigate(['/product-details'], {
        queryParams: {
          id: this.productId,
          buyFlag: this.buyFlag
 
        },
      });
    }
  }
  constructor(private router: Router) { }
}
