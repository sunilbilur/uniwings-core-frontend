import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ClarityModule } from '@clr/angular';
import { ClarityIcons, dragHandleIcon } from '@cds/core/icon';

ClarityIcons.addIcons(dragHandleIcon);

@Component({
  selector: 'app-comp-element',
  standalone: true,
  imports: [ClarityModule],
  templateUrl: './comp-element.component.html',
  styleUrl: './comp-element.component.css'
})
export class CompElementComponent {
  @Input() compItem: any = null;
  @Output() compItemChange = new EventEmitter<any>();

  setCompName(name: string) {
    this.compItem[0] = name;
    this.compItemChange.emit(this.compItem)
  }

}
