import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompsContainer } from './comps-container.component';

describe('CompsContainer', () => {
  let component: CompsContainer;
  let fixture: ComponentFixture<CompsContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompsContainer]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
