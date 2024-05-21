import { Component, Input } from '@angular/core';

import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { FeedbackService } from '../../_kitcoek-services/feedback.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-feedback-questions',
  standalone: true,
  imports: [CardModule, TableModule, ButtonModule, InputTextModule, TagModule],
  templateUrl: './feedback-questions.component.html',
  styleUrl: './feedback-questions.component.css'
})
export class FeedbackQuestionsComponent {
  @Input() compConfig = null;
  questions: any = null;
  addQuestionVisible: any =null;

  constructor(private feedbackService: FeedbackService) {
    feedbackService.getQuestions().subscribe((data: any) => {
      this.questions = data;
      console.log("[log] questions: ",this.questions);
    })
  }
}
