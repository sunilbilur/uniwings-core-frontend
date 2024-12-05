import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBookbankManagementComponent } from './library-bookbank-management.component';

describe('LibraryBookbankManagementComponent', () => {
  let component: LibraryBookbankManagementComponent;
  let fixture: ComponentFixture<LibraryBookbankManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookbankManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryBookbankManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
