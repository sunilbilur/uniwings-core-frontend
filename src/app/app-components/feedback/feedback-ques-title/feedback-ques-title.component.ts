import { Component } from '@angular/core';
import { PageTitleComponent } from '../../appwide/page-title/page-title.component';
import { PageSubtitleComponent } from '../../appwide/page-subtitle/page-subtitle.component';

@Component({
  selector: 'app-feedback-ques-title',
  standalone: true,
  imports: [PageTitleComponent, PageSubtitleComponent],
  templateUrl: './feedback-ques-title.component.html',
  styleUrl: './feedback-ques-title.component.css'
})
export class FeedbackQuesTitleComponent {

}
