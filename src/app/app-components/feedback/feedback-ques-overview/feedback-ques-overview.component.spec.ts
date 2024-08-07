import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackQuesOverviewComponent } from './feedback-ques-overview.component';

describe('FeedbackQuesOverviewComponent', () => {
  let component: FeedbackQuesOverviewComponent;
  let fixture: ComponentFixture<FeedbackQuesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackQuesOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbackQuesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
