import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackScheduleComponent } from './feedback-schedule.component';

describe('FeedbackScheduleComponent', () => {
  let component: FeedbackScheduleComponent;
  let fixture: ComponentFixture<FeedbackScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbackScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
