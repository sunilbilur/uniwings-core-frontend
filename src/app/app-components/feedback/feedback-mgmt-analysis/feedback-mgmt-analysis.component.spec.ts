import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackMgmtAnalysisComponent } from './feedback-mgmt-analysis.component';

describe('FeedbackMgmtAnalysisComponent', () => {
  let component: FeedbackMgmtAnalysisComponent;
  let fixture: ComponentFixture<FeedbackMgmtAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackMgmtAnalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbackMgmtAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
