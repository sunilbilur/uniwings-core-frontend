import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackResultsComponent } from './feedback-results.component';

describe('FeedbackResultsComponent', () => {
  let component: FeedbackResultsComponent;
  let fixture: ComponentFixture<FeedbackResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbackResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
