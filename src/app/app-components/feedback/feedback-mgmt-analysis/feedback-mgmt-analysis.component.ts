import { Component, Input } from '@angular/core';

import { ClarityModule } from '@clr/angular';
import { FeedbackService } from '../../../_services/feedback.service';
import { firstValueFrom } from 'rxjs';

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
  feedbackAnalysis: any = null;
  allResponses: any = null;
  selectedStudent: any = null;

  responseModalOpened: boolean = false;

  constructor(private feedbackService: FeedbackService) {
    this.feedbackService.getSelectedFeedbackData().subscribe(async (data: any) => {
      this.selectedFeedback = data;

      if (this.selectedFeedback !== null) {
        this.feedbackAnalysis = await firstValueFrom(this.feedbackService.getFeedbackAnalysis(this.selectedFeedback._id));
        this.allResponses = await firstValueFrom(this.feedbackService.getAllResponses(this.selectedFeedback._id));
        console.log(this.feedbackAnalysis, this.allResponses);
      }
    });
  }

  async ngOnInit() {

  }

  openResponseModal() {
    this.responseModalOpened = true;
    this.feedbackService.getAllResponses(this.selectedFeedback._id);
  }



}
