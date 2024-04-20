import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompsgridComponent } from './compsgrid.component';

describe('CompsgridComponent', () => {
  let component: CompsgridComponent;
  let fixture: ComponentFixture<CompsgridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompsgridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompsgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
