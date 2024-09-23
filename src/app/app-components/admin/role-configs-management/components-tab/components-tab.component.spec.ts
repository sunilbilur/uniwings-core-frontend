import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsTabComponent } from './components-tab.component';

describe('ComponentsTabComponent', () => {
  let component: ComponentsTabComponent;
  let fixture: ComponentFixture<ComponentsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponentsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
