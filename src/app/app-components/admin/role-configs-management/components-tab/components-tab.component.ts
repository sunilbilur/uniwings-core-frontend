import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-components-tab',
  standalone: true,
  imports: [],
  templateUrl: './components-tab.component.html',
  styleUrl: './components-tab.component.css'
})
export class ComponentsTabComponent {
  @Input() roleConfig: any = null;
  currentPriEntry: any = null;

  constructor() {

  }

  selectPriEntry(priEntry: any) {
    this.currentPriEntry = priEntry;
  }
}
