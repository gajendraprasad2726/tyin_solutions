import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  isAboutVisible = true;  // Initial state is false
  isVisionVisible = false;
  isWhyUsVisible = false;
  isFeaturesVisible = false;
  isMeetVisible = false;
  isServicesVisible = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  toggleAboutVisibility() {
    this.isAboutVisible = true;  // Toggle the boolean value
    this.isVisionVisible = false;
    this.isWhyUsVisible = false;
    this.isFeaturesVisible = false;
    this.isMeetVisible = false;
    this.isServicesVisible = false;
    window.scrollTo(0, 0); // Scroll to the top of the page
  }

  toggleVisionVisibility() {
    this.isAboutVisible = false;  // Toggle the boolean value
    this.isVisionVisible = true;
    this.isWhyUsVisible = false;
    this.isFeaturesVisible = false;
    this.isMeetVisible = false;
    this.isServicesVisible = false;
    window.scrollTo(0, 0); // Scroll to the top of the page
  }

  toggleFeatureVisibility() {
    this.isAboutVisible = false;  // Toggle the boolean value
    this.isVisionVisible = false;
    this.isWhyUsVisible = false;
    this.isFeaturesVisible = true;
    this.isMeetVisible = false;
    this.isServicesVisible = false;
    window.scrollTo(0, 0); // Scroll to the top of the page
  }

  toggleWhyUsVisibility() {
    this.isAboutVisible = false;  // Toggle the boolean value
    this.isVisionVisible = false;
    this.isWhyUsVisible = true;
    this.isFeaturesVisible = false;
    this.isMeetVisible = false;
    this.isServicesVisible = false;
    window.scrollTo(0, 0); // Scroll to the top of the page
  }

  toggleServicesVisibility() {
    this.isAboutVisible = false;  // Toggle the boolean value
    this.isVisionVisible = false;
    this.isWhyUsVisible = false;
    this.isFeaturesVisible = false;
    this.isMeetVisible = false;
    this.isServicesVisible = true;
    window.scrollTo(0, 0); // Scroll to the top of the page
  }

  toggleMeetVisibility() {
    this.isAboutVisible = false;  // Toggle the boolean value
    this.isVisionVisible = false;
    this.isWhyUsVisible = false;
    this.isFeaturesVisible = false;
    this.isMeetVisible = true;
    this.isServicesVisible = false;
    window.scrollTo(0, 0); // Scroll to the top of the page
  }

}
