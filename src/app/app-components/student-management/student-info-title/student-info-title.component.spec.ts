import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInfoTitleComponent } from './student-info-title.component';

describe('StudentInfoTitleComponent', () => {
  let component: StudentInfoTitleComponent;
  let fixture: ComponentFixture<StudentInfoTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentInfoTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentInfoTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
