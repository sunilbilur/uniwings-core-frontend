import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackStudentsComponent } from './feedback-students.component';

describe('FeedbackStudentsComponent', () => {
  let component: FeedbackStudentsComponent;
  let fixture: ComponentFixture<FeedbackStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackStudentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbackStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
