import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Trade Your Inventory';
  sideNavStatus = false;

  constructor(private router: Router) { }

  //onSearch(query: string): void {
  //  if (query) {
  //    this.router.navigate(['/search', query]); // Navigate to the search results
  //  } else {
  //    this.router.navigate(['/products']); // Navigate to all products if no search query
  //  }
  //}
}
