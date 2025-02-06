import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsSchemasManagementComponent } from './forms-schemas-management.component';

describe('FormsSchemasManagementComponent', () => {
  let component: FormsSchemasManagementComponent;
  let fixture: ComponentFixture<FormsSchemasManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsSchemasManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsSchemasManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
