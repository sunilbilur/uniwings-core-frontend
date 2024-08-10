import { Component, Input } from '@angular/core';
import { PageTitleComponent } from "../../appwide/page-title/page-title.component";

@Component({
  selector: 'app-feedback-ques-overview',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './feedback-ques-overview.component.html',
  styleUrl: './feedback-ques-overview.component.css'
})
export class FeedbackQuesOverviewComponent {
  @Input() compOptions = null;

}
