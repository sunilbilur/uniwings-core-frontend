import { Component } from '@angular/core';

import { ClarityModule } from '@clr/angular';

import { PageTitleComponent } from '../../appwide/page-title/page-title.component';

@Component({
  selector: 'app-apply-leaves',
  standalone: true,
  imports: [ClarityModule, PageTitleComponent],
  templateUrl: './apply-leaves.component.html',
  styleUrl: './apply-leaves.component.css'
})
export class ApplyLeavesComponent {

}
