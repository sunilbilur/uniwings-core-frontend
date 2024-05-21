import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackQuestionsComponent } from './feedback-questions.component';

describe('FeedbackQuestionsComponent', () => {
  let component: FeedbackQuestionsComponent;
  let fixture: ComponentFixture<FeedbackQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackQuestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbackQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
