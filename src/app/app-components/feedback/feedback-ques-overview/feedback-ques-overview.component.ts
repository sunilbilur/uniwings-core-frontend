import { Component, Input } from '@angular/core';
import { PageTitleComponent } from "../../appwide/page-title/page-title.component";
import { FeedbackService } from '../../../_services/feedback.service';

@Component({
  selector: 'app-feedback-ques-overview',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './feedback-ques-overview.component.html',
  styleUrl: './feedback-ques-overview.component.css'
})
export class FeedbackQuesOverviewComponent {
  @Input() compConfig = null;
  questionsList: any = [];
  questionsTagsList: any = [];

  constructor(private feedbackService: FeedbackService) { }

  async ngOnInit() {
    this.questionsList = await this.feedbackService.getDataQuestionsList();
    this.questionsTagsList = await this.feedbackService.getDataTagsList();
    console.log("question tags list: ", this.questionsTagsList);
  }



}
