import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackMgmtScheduleComponent } from './feedback-mgmt-schedule.component';

describe('FeedbackMgmtScheduleComponent', () => {
  let component: FeedbackMgmtScheduleComponent;
  let fixture: ComponentFixture<FeedbackMgmtScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackMgmtScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbackMgmtScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
