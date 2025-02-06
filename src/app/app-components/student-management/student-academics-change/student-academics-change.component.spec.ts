import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAcademicsChangeComponent } from './student-academics-change.component';

describe('StudentAcademicsChangeComponent', () => {
  let component: StudentAcademicsChangeComponent;
  let fixture: ComponentFixture<StudentAcademicsChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAcademicsChangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAcademicsChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
