import { Component } from '@angular/core';

import { ClarityModule } from '@clr/angular';

import { PageTitleComponent } from '../../appwide/page-title/page-title.component';

@Component({
  selector: 'app-approve-leaves',
  standalone: true,
  imports: [ClarityModule, PageTitleComponent],
  templateUrl: './approve-leaves.component.html',
  styleUrl: './approve-leaves.component.css'
})
export class ApproveLeavesComponent {

}
