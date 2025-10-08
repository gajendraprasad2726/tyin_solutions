import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { Router } from '@angular/router';
import { Product } from '../models/models';

@Component({
  selector: 'app-admin-approvals',
  templateUrl: './admin-approvals.component.html',
  styleUrls: ['./admin-approvals.component.css'],
})
export class AdminApprovalsComponent implements OnInit {
  pendingProducts: Product[] = [];
  view: 'grid' | 'list' = 'grid';

  constructor(
    private nav: NavigationService,
    private util: UtilityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.util.isAdminEmail()) {
      this.router.navigate(['/unauthorized']);
      return;
    }
    this.loadPending();
  }

  loadPending() {
    this.nav.getPendingProducts().subscribe(res => {
      this.pendingProducts = res;
    });
  }

  approve(id: number) {
    this.nav.updateApprovalStatus(id, 'approved').subscribe(() => {
      this.loadPending();
    });
  }

  reject(id: number) {
    this.nav.updateApprovalStatus(id, 'rejected').subscribe(() => {
      this.loadPending();
    });
  }
}
