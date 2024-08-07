import { Component, Input } from '@angular/core';

import { FeedbackService } from '../../../_services/feedback.service';

@Component({
  selector: 'app-feedback-questions',
  standalone: true,
  imports: [],
  templateUrl: './feedback-questions.component.html',
  styleUrl: './feedback-questions.component.css'
})
export class FeedbackQuestionsComponent {
  @Input() compOptions = null;
  questions: any = null;
  addQuestionVisible: any =null;

  constructor(private feedbackService: FeedbackService) {
    feedbackService.getQuestions().subscribe((data: any) => {
      this.questions = data;
      console.log("[log] questions: ",this.questions);
    })
  }


}
