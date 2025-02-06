import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsClassesManagementComponent } from './programs-classes-management.component';

describe('ProgramsClassesManagementComponent', () => {
  let component: ProgramsClassesManagementComponent;
  let fixture: ComponentFixture<ProgramsClassesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramsClassesManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramsClassesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
