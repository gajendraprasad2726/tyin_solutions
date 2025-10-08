import { Component, OnInit } from '@angular/core';
import { Quotation } from '../models/models';
import { Router } from '@angular/router';
import { QuotationMobileNumberComponent } from '../quotation-mobile-number/quotation-mobile-number.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-integrateai',
  templateUrl: './integrateai.component.html',
  styleUrls: ['./integrateai.component.css']
})
export class IntegrateaiComponent implements OnInit {

  quotations: Quotation[] = [
    { id: 1, title: 'Extracting Key Points from BOQ Contracts', description: 'Identify the most relevant and essential details to understand the scope of the work, costs, list the quantities, specifications of materials, labor,  terms & conditions, services required for the project.', buttonText: 'View Quotation', quotationFromMobileNo: '', status: 'Work in Progress'},
    { id: 2, title: 'Client Response Mail', description: 'Automatic Response Generation when a client submits a letter (e.g., requesting information, raising concerns, or submitting documents, etc.)', buttonText: 'View Quotation', quotationFromMobileNo: '', status: 'Work in Progress' },
    { id: 3, title: 'Real Time Monitoring', description: 'Monitor Construction sites in real-time, providing aerial views and detecting any issues such as safety hazards or schedule discrepancies.', buttonText: 'View Quotation', quotationFromMobileNo: '', status: 'Work in Progress' },
    { id: 4, title: 'Progress Tracking', description: 'AI tools can compare the current state of a construction project with digital models to track progress and ensure timelines are met', buttonText: 'View Quotation', quotationFromMobileNo: '', status: 'Work in Progress' },
    { id: 5, title: 'Health Monitoring through Safety Wearables', description: 'AI-powered Safety Helmets/Jackets/Shoes can monitor workers health(e.g., fatigue levels, heart rate) and alert managers to potential issues before they become accidents.', buttonText: 'View Quotation', quotationFromMobileNo: '', status: 'Work in Progress' },
    { id: 6, title: 'Material Management', description: 'AI can optimize supply chain operations by predicting material needs and automating inventory management, reducing waste and ensuring that materials are available just in time.', buttonText: 'View Quotation', quotationFromMobileNo: '', status: 'Work in Progress' },
    { id: 7, title: 'Mumbai Real Estate Price Prediction', description: 'Estimate Property prices in Mumbai housing market using Machine Learning Algorithms.', buttonText: 'View Quotation', quotationFromMobileNo: '', status: 'Available' },
    { id: 8, title: 'Residual Bending Moment Capacity', description: 'Predicting the Residual Bending Moment Capacity of Corroded RC Beams using Machine Learning Algorithms.', buttonText: 'View Quotation', quotationFromMobileNo: '', status: 'Available' },
    { id: 9, title: 'Water Quality Index Prediction', description: 'Prediction of Water Quality Index (WQI) using Machine Learning.', buttonText: 'View Quotation', quotationFromMobileNo: '', status: 'Available' },
    { id: 10, title: 'Reservoir Water Level Analysis', description: 'Reservoir Water Level Analysis using Random Forest.', buttonText: 'View Quotation', quotationFromMobileNo: '', status: 'Available' },
    { id: 11, title: 'Estimation Tools', description: 'AI can analyze historical project data to provide more accurate cost estimates and budgets, reducing the chances of financial overruns.', buttonText: 'View Quotation', quotationFromMobileNo: '', status: 'Work in Progress' },
    { id: 12, title: 'Contract Analysis', description: 'AI can help lawyers and construction managers analyze complex contracts, flagging risks, obligations, and potential areas of concern automatically.', buttonText: 'View Quotation', quotationFromMobileNo: '', status: 'Work in Progress' },
    { id: 13, title: 'Labour Attendance through Face Recognition', description: 'Labour Attendance through Face Recognition for skilled & Unskilled labour.', buttonText: 'View Quotation', quotationFromMobileNo: '', status: 'Work in Progress' },
    { id: 14, title: 'Level of Water Contamination', description: 'Prediction of Water Quality from element concentration in Water.', buttonText: 'View Quotation', quotationFromMobileNo: '', status: 'Available' },
    { id: 15, title: 'Potability of Water', description: 'Predict Water Potability, assessing Safety through diverse quality indicators.', buttonText: 'View Quotation', quotationFromMobileNo: '', status: 'Available' },
    { id: 16, title: 'BOQ Rate Analysis', description: 'Automate Rate Analysis & Budget Calculation, Centralize data & ensure accuracy.', buttonText: 'View Quotation', quotationFromMobileNo: '', status: 'Available' }
  ];

  toastVisible = false;
  toastMessage = '';
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {}

  // Method to be triggered when any button is clicked
  viewQuotation(quotationTitle: string): void {
    console.log(`Redirecting to the Quotation/Pricing view for: ${quotationTitle}`);
    this.router.navigate(['/quotation-mobile-no', quotationTitle]);  // example route
    // Here you could add navigation or any action to show specific quotation details
  }


  // Show toast message for a given duration (default 3s)
  showToast(message: string, duration: number = 3000): void {
    this.toastMessage = message;
    this.toastVisible = true;

    setTimeout(() => {
      this.toastVisible = false;
    }, duration);
  }

  downloadPPT(quotationTitle: string): void {
    const fileName = `${quotationTitle}.pptx`;
    const fileUrl = `assets/Presentation/${fileName}`;

    // Use HTTP HEAD to check if file exists
    this.http.head(fileUrl, { observe: 'response' }).subscribe({
      next: response => {
        if (response.status === 200) {
          // Trigger download
          const link = document.createElement('a');
          link.href = fileUrl;
          link.download = fileName;
          link.click();
        } else {
          this.showToast('Unable to access the presentation.');
        }
      },
      error: () => {
        this.showToast(`Work in progress. We kindly request you to raise a quotation.`);
      }
    });
  }


}




