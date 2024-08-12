import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackMgmtTitleComponent } from './feedback-mgmt-title.component';

describe('FeedbackMgmtTitleComponent', () => {
  let component: FeedbackMgmtTitleComponent;
  let fixture: ComponentFixture<FeedbackMgmtTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackMgmtTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbackMgmtTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
