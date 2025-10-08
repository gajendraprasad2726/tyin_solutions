import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationMobileNumberComponent } from './quotation-mobile-number.component';

describe('QuotationMobileNumberComponent', () => {
  let component: QuotationMobileNumberComponent;
  let fixture: ComponentFixture<QuotationMobileNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationMobileNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationMobileNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
