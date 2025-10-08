import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appOpenSearchedProducts]'
})
export class OpenSearchedProductsDirective {
  @Input() searchQuery: string = '';
  @Output() enterPressed = new EventEmitter<string>();  // Event to emit the input value when Enter is pressed

  constructor(private router: Router, private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') openSearchedProducts() {
    this.router.navigate(['/searched-products'], {
      queryParams: {
        searchQuery: this.searchQuery,
      },
    });
    console.log('exeuted')
  }

  @HostListener('keydown.enter', ['$event'])
  onEnterPressed(event: KeyboardEvent) {
    this.router.navigate(['/searched-products'], {
      queryParams: {
        searchQuery: this.searchQuery,
      },
    });
    console.log('exeuted')

  }
}
