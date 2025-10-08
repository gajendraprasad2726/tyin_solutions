import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrateaiComponent } from './integrateai.component';

describe('IntegrateaiComponent', () => {
  let component: IntegrateaiComponent;
  let fixture: ComponentFixture<IntegrateaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegrateaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntegrateaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
