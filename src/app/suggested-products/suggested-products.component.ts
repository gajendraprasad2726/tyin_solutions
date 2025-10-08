import { Component, Input, OnInit } from '@angular/core';
import { OrderedQty, Product } from '../models/models';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-suggested-products',
  templateUrl: './suggested-products.component.html',
  styleUrls: ['./suggested-products.component.css'],
})
export class SuggestedProductsComponent implements OnInit {
  cartOrderedQty: OrderedQty = {
    qty: 0
  };
  availableqtyflag: boolean = true;
  @Input() buyFlag : any 
  @Input() product: Product = {
      id: 0,
      title: '',
      description: '',
      price: 0,
      quantity: 0,
      productCategory: {
          id: 1,
          category: '',
          subCategory: '',
      },
      imageName: '',
      hsnCode: '',
      uom: '',
      fromAddress: '',
      fromCity: '',
      fromOrganizationName: '',
      fromState: '',
      manufacturerName: '',
      manufacturerDate: new Date(""),
      lastQualityTested: new Date(""),
      labTested: '',
      totalAmount: 0,
      orderedQty: 0,
      toAddress: '',
      toPinCode: 0,
      toMobileNo: '',
      expiryDate: new Date(""),
      sellingPrice: 0,
      gstNumber: '',
      grnNumber: '',
      materialType: '',
      grade: '',
      diameter: '',
      length: '',
      size: '',
      shape: '',
      productContactNo: '',
      bidPrice: 0,
      productCategoryId: 0,
      createdAt: new Date(""), 
      modifiedAt: new Date(""), 
      fromPinCode: '',
      userId: 0
  };

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.navigationService.orderedQty(this.product.id).subscribe((res1: any) => {
      this.cartOrderedQty = res1;
    })
  }
}
