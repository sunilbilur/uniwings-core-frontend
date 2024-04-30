import { Component, Input } from '@angular/core';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-comp-one',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './comp-one.component.html',
  styleUrl: './comp-one.component.css'
})
export class CompOneComponent {
  @Input() compConfig = null;
}
