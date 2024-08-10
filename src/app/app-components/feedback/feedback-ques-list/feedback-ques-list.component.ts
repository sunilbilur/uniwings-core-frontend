import { Component, Input } from '@angular/core';
import { ClrDatagridModule, ClrIconModule } from '@clr/angular';

@Component({
  selector: 'app-feedback-ques-list',
  standalone: true,
  imports: [ClrDatagridModule, ClrIconModule],
  templateUrl: './feedback-ques-list.component.html',
  styleUrl: './feedback-ques-list.component.css'
})
export class FeedbackQuesListComponent {
  @Input() compOptions = null;
  users: any = [];

  constructor() {
  }

}
