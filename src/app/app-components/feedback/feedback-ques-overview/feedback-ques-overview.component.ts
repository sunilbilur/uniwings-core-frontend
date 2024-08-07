import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feedback-ques-overview',
  standalone: true,
  imports: [],
  templateUrl: './feedback-ques-overview.component.html',
  styleUrl: './feedback-ques-overview.component.css'
})
export class FeedbackQuesOverviewComponent {
  @Input() compOptions = null;

}
