import {
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Category, NavigationItem, Product } from '../models/models';
import { RegisterComponent } from '../register/register.component';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('modalTitle') modalTitle!: ElementRef;
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  @ViewChild('generalmodal')
    modalElement!: ElementRef; // Get reference to the modal element
  cartItems: number = 0;
  results: any[] = [];
  isLoading: boolean = false;
  products: Product[] = [];
  view: 'grid' | 'list' = 'grid';
  buyFlag: any = 1;

  searchQuery: string = '';
  navigationList: NavigationItem[] = [];
  closeModalDialogBox: boolean = false;

  constructor(
    private navigationService: NavigationService,
    public utilityService: UtilityService,
    private router: Router
  ) { }

  ngOnInit(): void {

    // Get Category List
    this.navigationService.getCategoryList().subscribe((list: Category[]) => {
      for (let item of list) {
        let present = false;
        for (let navItem of this.navigationList) {
          if (navItem.category === item.category) {
            navItem.subcategories.push(item.subCategory);
            present = true;
            break; // stop inner loop once found
          }
        }
        if (!present) {
          this.navigationList.push({
            category: item.category,
            subcategories: [item.subCategory],
          });
        }
      }
      // Define your desired category order here:
      const order = ['Quality Materials', 'Overstock Deals', 'Scrap Market'];

      // Sort navigationList by this order:
      this.navigationList.sort((a, b) => {
        const indexA = order.indexOf(a.category);
        const indexB = order.indexOf(b.category);

        // Categories not in the order array go last
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;

        return indexA - indexB;
      });
    });

    // Cart
    if (this.utilityService.isLoggedIn()) {
      this.navigationService
        .getActiveCartOfUser(this.utilityService.getUser().id)
        .subscribe((res: any) => {
          this.cartItems = res.cartItems.length;
        });
    }

    this.utilityService.changeCart.subscribe((res: any) => {
      if (parseInt(res) === 0) this.cartItems = 0;
      else this.cartItems += parseInt(res);
    });
  }

  onSearch(query: string) {
    this.searchQuery = query;
  }

  loginComp() {
    this.router.navigate(['/login'])
  }

  registerComp() {
    this.router.navigate(['/register'])
  }

  onStartSellingClick(): void {
    if (this.utilityService.isLoggedIn()) {
      // Navigate to the upload material page
      this.router.navigate(['/uploadmaterial']);
    } else {
      // Show a warning message
      alert('Please log in to start selling.');
      this.router.navigate(['/home']);
    }
  }

}

