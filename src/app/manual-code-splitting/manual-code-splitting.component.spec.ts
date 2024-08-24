import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualCodeSplittingComponent } from './manual-code-splitting.component';

describe('ManualCodeSplittingComponent', () => {
  let component: ManualCodeSplittingComponent;
  let fixture: ComponentFixture<ManualCodeSplittingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualCodeSplittingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManualCodeSplittingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
