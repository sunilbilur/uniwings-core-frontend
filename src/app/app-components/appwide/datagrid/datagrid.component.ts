import { Component, Input } from '@angular/core';
import { ClrDatagridModule, ClrIconModule } from '@clr/angular';

@Component({
  selector: 'app-datagrid',
  standalone: true,
  imports: [ClrDatagridModule, ClrIconModule],
  templateUrl: './datagrid.component.html',
  styleUrl: './datagrid.component.css'
})
export class DatagridComponent {
  @Input() title: string = "err: name not set";

}
