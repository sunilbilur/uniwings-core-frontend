import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBuilderComponent } from './app-builder.component';

describe('AppBuilderComponent', () => {
  let component: AppBuilderComponent;
  let fixture: ComponentFixture<AppBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
