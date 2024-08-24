import { Component, Input } from '@angular/core';
import { PageTitleComponent } from '../../appwide/page-title/page-title.component';
import { PageSubtitleComponent } from '../../appwide/page-subtitle/page-subtitle.component';

@Component({
  selector: 'app-feedback-mgmt-title',
  standalone: true,
  imports: [PageTitleComponent, PageSubtitleComponent],
  templateUrl: './feedback-mgmt-title.component.html',
  styleUrl: './feedback-mgmt-title.component.css'
})
export class FeedbackMgmtTitleComponent {
  @Input() compConfig: any;

  constructor() {
    console.log("[log] feedback-mgmt-title.component.ts || compConfig: ", this.compConfig);
  }
}
