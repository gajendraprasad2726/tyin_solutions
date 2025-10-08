import { Component, OnInit } from '@angular/core';
import { Category, NavigationItem, Product, SuggestedProduct } from '../models/models';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  buyFlag: any ;
  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.navigationService
      .getSuggestedProducts()
      .subscribe((res: any) => {
        this.products = res;
        this.buyFlag = 1;
      });
  }
}
