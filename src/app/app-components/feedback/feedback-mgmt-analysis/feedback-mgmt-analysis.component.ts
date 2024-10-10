import { Component, Input } from '@angular/core';

import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-feedback-mgmt-analysis',
  standalone: true,
  imports: [ClarityModule],
  templateUrl: './feedback-mgmt-analysis.component.html',
  styleUrl: './feedback-mgmt-analysis.component.css'
})
export class FeedbackMgmtAnalysisComponent {
  @Input() compConfig: any;

}
