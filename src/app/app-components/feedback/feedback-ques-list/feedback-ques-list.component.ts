import { Component, Input } from '@angular/core';
import { ClrDatagridModule, ClrIconModule } from '@clr/angular';
import { DatagridComponent } from '../../appwide/datagrid/datagrid.component';

@Component({
  selector: 'app-feedback-ques-list',
  standalone: true,
  imports: [DatagridComponent, ClrDatagridModule, ClrIconModule],
  templateUrl: './feedback-ques-list.component.html',
  styleUrl: './feedback-ques-list.component.css'
})
export class FeedbackQuesListComponent {
  @Input() compConfig = null;
  users: any = [];

  constructor() {
  }

}
