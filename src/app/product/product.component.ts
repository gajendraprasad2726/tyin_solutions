import { Component, Input, OnInit } from '@angular/core';
import { CartIt, OrderedQty, Product } from '../models/models';
import { UtilityService } from '../services/utility.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  cartOrderedQty: OrderedQty = {
    qty: 0
  };
  availableqtyflag: boolean = true;
  @Input() buyFlag : any = 1;
  @Input() view: 'grid' | 'list' | 'currcartitem' | 'prevcartitem' = 'grid';
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
      manufacturerName: '',
      manufacturerDate: new Date(""),
      lastQualityTested: new Date(""),
      labTested: '',
      totalAmount: 0,
      orderedQty: 0,
      toAddress: '',
      fromCity: '',
      fromAddress: '',
      fromOrganizationName: '',
      fromState: '',
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
  @Input() cartIt: CartIt = {
    id: 0,
    orderedQty: 0,
    bidPrice: 0
  };
  @Input() cartFlag: any = 1;

  constructor(public utilityService: UtilityService, private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.navigationService.orderedQty(this.product.id).subscribe((res1: any) => {
      this.cartOrderedQty = res1;
    })
 }  
}
