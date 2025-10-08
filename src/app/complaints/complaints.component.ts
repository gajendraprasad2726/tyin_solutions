import { Component, OnInit } from '@angular/core';
import { Complaint } from '../models/models';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { timer } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {
  complaints: Complaint[] = [];

  newComplaint: Complaint = {
    id: 0,
    userId: 0,
    title: '',
    description: '',
    status: 'Open', // ✅ Standardized casing
    createdAt: new Date()
  };

  complaintFlag: boolean = false;
  blankComplaintFlag: boolean = false;

  private userId!: number;

  constructor(
    public navigationService: NavigationService,
    public utilityService: UtilityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });

    this.userId = this.utilityService.getUser().id; // ✅ Get once and reuse
    this.loadComplaints();
  }

  loadComplaints(): void {
    this.navigationService.getComplaints(this.userId).subscribe((complaints: Complaint[]) => {
      this.complaints = complaints;
    });
  }

  submitComplaint(): void {
    const { title, description } = this.newComplaint;

    if (!title.trim() || !description.trim()) {
      this.showBlankComplaintFlag();
      return;
    }

    const complaintToSubmit: Complaint = {
      ...this.newComplaint,
      userId: this.userId,
      status: 'Open',
      createdAt: new Date()
    };

    this.navigationService.addComplaint(complaintToSubmit).subscribe((complaint: Complaint) => {
      this.complaints.push(complaint);
      this.resetComplaintForm();
      this.showComplaintFlag();
    });
  }

  private resetComplaintForm(): void {
    this.newComplaint = {
      id: 0,
      userId: 0,
      title: '',
      description: '',
      status: 'Open',
      createdAt: new Date()
    };
  }

  private showBlankComplaintFlag(): void {
    this.blankComplaintFlag = true;
    timer(3000).subscribe(() => (this.blankComplaintFlag = false));
  }

  private showComplaintFlag(): void {
    alert('Your complaint has been registered.');
    this.router.navigateByUrl('/home');
    this.complaintFlag = true;
    timer(3000).subscribe(() => (this.complaintFlag = false));
  }
}
