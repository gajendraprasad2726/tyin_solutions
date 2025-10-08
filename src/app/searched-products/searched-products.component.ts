import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { Product } from '../models/models';

@Component({
  selector: 'app-searched-products',
  templateUrl: './searched-products.component.html',
  styleUrls: ['./searched-products.component.css']
})
export class SearchedProductsComponent implements OnInit {
  searchQuery: string = '';
  searchText1: string = ''; // State
  searchText2: string = ''; // City
  products: any[] = [];
  loading: boolean = false;
  view: string = 'grid'; // Can toggle to 'list'
  page: number = 1;
  pageSize: number = 20;

  states: string[] = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
    "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
    "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  constructor(
    private route: ActivatedRoute,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['searchQuery'] || '';
      if (this.searchQuery) {
        this.fetchProducts();
      }
    });
  }

  fetchProducts(): void {
    this.loading = true;
    this.navigationService.getSearchedProducts(this.searchQuery, this.page, this.pageSize).subscribe(
      data => {
        this.products = data;
        this.loading = false;
      },
      error => {
        console.error('Error fetching products:', error);
        this.loading = false;
      }
    );
  }

  getFilteredProducts(): any[] {
    return this.products.filter(product => {
      const matchesState = !this.searchText1 || (product.fromState?.toLowerCase().includes(this.searchText1.toLowerCase()));
      const matchesCity = !this.searchText2 || (product.fromCity?.toLowerCase().includes(this.searchText2.toLowerCase()));
      return matchesState && matchesCity;
    });
  }
}


