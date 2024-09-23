import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationEntriesTabComponent } from './navigation-entries-tab.component';

describe('NavigationEntriesTabComponent', () => {
  let component: NavigationEntriesTabComponent;
  let fixture: ComponentFixture<NavigationEntriesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationEntriesTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigationEntriesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
