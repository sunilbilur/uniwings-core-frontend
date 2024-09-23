import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-information-tab',
  standalone: true,
  imports: [],
  templateUrl: './information-tab.component.html',
  styleUrl: './information-tab.component.css'
})
export class InformationTabComponent {
  @Input() roleConfig: any = null

  constructor() {
    console.log("from information tab: ",this.roleConfig);
  }
  ngOnInit() {
    console.log("from information tab: ",this.roleConfig);
  }
}
