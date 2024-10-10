import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompElementComponent } from './comp-element.component';

describe('CompElementComponent', () => {
  let component: CompElementComponent;
  let fixture: ComponentFixture<CompElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
