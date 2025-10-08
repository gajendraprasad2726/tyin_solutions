import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAiReqComponent } from './post-ai-req.component';

describe('PostAiReqComponent', () => {
  let component: PostAiReqComponent;
  let fixture: ComponentFixture<PostAiReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAiReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAiReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
