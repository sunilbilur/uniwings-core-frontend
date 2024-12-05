import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryStudentComponent } from './library-student.component';

describe('LibraryStudentComponent', () => {
  let component: LibraryStudentComponent;
  let fixture: ComponentFixture<LibraryStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
