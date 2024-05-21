import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompLoader } from './comp-loader.component';

describe('CompLoader', () => {
  let component: CompLoader;
  let fixture: ComponentFixture<CompLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompLoader]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
