import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionsManagementComponent } from './institutions-management.component';

describe('InstitutionsManagementComponent', () => {
  let component: InstitutionsManagementComponent;
  let fixture: ComponentFixture<InstitutionsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitutionsManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstitutionsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
