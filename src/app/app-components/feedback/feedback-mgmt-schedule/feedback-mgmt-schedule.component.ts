import { Component, Input } from '@angular/core';
import { DatagridComponent } from '../../appwide/datagrid/datagrid.component';
import  {ClrDatagridModule, ClrIconModule} from '@clr/angular';

@Component({
  selector: 'app-feedback-mgmt-schedule',
  standalone: true,
  imports: [DatagridComponent, ClrDatagridModule, ClrIconModule],
  templateUrl: './feedback-mgmt-schedule.component.html',
  styleUrl: './feedback-mgmt-schedule.component.css'
})
export class FeedbackMgmtScheduleComponent {
  @Input() compOptions = null;
  users: any = [];

}
