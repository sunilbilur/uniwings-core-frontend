import { Component, Input } from '@angular/core';

import { ClarityModule } from '@clr/angular';
import { FeedbackService } from '../../../_services/feedback.service';

@Component({
  selector: 'app-feedback-mgmt-analysis',
  standalone: true,
  imports: [ClarityModule],
  templateUrl: './feedback-mgmt-analysis.component.html',
  styleUrl: './feedback-mgmt-analysis.component.css'
})
export class FeedbackMgmtAnalysisComponent {
  @Input() compConfig: any;
  selectedFeedback: any = null;

  constructor(private feedbackService: FeedbackService) {
    this.feedbackService.getSelectedFeedbackData().subscribe((data: any) => {
      this.selectedFeedback = data;
      console.log("selected feedback: ", this.selectedFeedback);
    })
  }

  async ngOnInit() {

  }



}
