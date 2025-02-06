import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsCoursesManagementComponent } from './departments-courses-management.component';

describe('DepartmentsCoursesManagementComponent', () => {
  let component: DepartmentsCoursesManagementComponent;
  let fixture: ComponentFixture<DepartmentsCoursesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentsCoursesManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentsCoursesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
