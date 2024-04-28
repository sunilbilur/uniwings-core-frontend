import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comp-one',
  standalone: true,
  imports: [],
  templateUrl: './comp-one.component.html',
  styleUrl: './comp-one.component.css'
})
export class CompOneComponent {
  @Input() compConfig = null;
}
