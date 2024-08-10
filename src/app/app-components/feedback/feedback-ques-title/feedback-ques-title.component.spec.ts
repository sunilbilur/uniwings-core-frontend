import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackQuesTitleComponent } from './feedback-ques-title.component';

describe('FeedbackQuesTitleComponent', () => {
  let component: FeedbackQuesTitleComponent;
  let fixture: ComponentFixture<FeedbackQuesTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackQuesTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbackQuesTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
