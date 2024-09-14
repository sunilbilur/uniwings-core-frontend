import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleConfigsManagementComponent } from './role-configs-management.component';

describe('RoleConfigsManagementComponent', () => {
  let component: RoleConfigsManagementComponent;
  let fixture: ComponentFixture<RoleConfigsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleConfigsManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleConfigsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
