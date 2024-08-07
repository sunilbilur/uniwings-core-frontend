import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompLoaderComponent } from './comp-loader.component';

describe('CompLoader', () => {
  let component: CompLoaderComponent;
  let fixture: ComponentFixture<CompLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
