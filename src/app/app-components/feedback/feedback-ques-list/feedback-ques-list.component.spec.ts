import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackQuesListComponent } from './feedback-ques-list.component';

describe('FeedbackQuesListComponent', () => {
  let component: FeedbackQuesListComponent;
  let fixture: ComponentFixture<FeedbackQuesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackQuesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbackQuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
