import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBooksManagementComponent } from './library-books-management.component';

describe('LibraryBooksManagementComponent', () => {
  let component: LibraryBooksManagementComponent;
  let fixture: ComponentFixture<LibraryBooksManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBooksManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryBooksManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
