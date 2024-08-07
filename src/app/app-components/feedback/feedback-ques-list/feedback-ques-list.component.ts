import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feedback-ques-list',
  standalone: true,
  imports: [],
  templateUrl: './feedback-ques-list.component.html',
  styleUrl: './feedback-ques-list.component.css'
})
export class FeedbackQuesListComponent {
  @Input() compOptions = null;

}
