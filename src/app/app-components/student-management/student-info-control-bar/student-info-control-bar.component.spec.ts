import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInfoControlBarComponent } from './student-info-control-bar.component';

describe('StudentInfoControlBarComponent', () => {
  let component: StudentInfoControlBarComponent;
  let fixture: ComponentFixture<StudentInfoControlBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentInfoControlBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentInfoControlBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
