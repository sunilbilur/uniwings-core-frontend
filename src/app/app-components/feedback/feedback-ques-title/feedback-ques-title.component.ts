import { Component, Input } from '@angular/core';
import { PageTitleComponent } from '../../appwide/page-title/page-title.component';

@Component({
  selector: 'app-feedback-ques-title',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './feedback-ques-title.component.html',
  styleUrl: './feedback-ques-title.component.css'
})
export class FeedbackQuesTitleComponent {
  @Input() compConfig: any;

}
