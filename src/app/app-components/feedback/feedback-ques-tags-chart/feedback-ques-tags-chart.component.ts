import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feedback-ques-tags-chart',
  standalone: true,
  imports: [],
  templateUrl: './feedback-ques-tags-chart.component.html',
  styleUrl: './feedback-ques-tags-chart.component.css'
})
export class FeedbackQuesTagsChartComponent {
  @Input() compOptions = null;
}
