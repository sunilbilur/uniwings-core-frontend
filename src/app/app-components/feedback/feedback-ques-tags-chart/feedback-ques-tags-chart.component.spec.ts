import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackQuesTagsChartComponent } from './feedback-ques-tags-chart.component';

describe('FeedbackQuesTagsChartComponent', () => {
  let component: FeedbackQuesTagsChartComponent;
  let fixture: ComponentFixture<FeedbackQuesTagsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackQuesTagsChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbackQuesTagsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
