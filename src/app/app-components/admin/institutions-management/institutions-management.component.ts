import { Component, Input } from '@angular/core';
import { PageTitleComponent } from '../../appwide/page-title/page-title.component';

@Component({
  selector: 'app-institutions-management',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './institutions-management.component.html',
  styleUrl: './institutions-management.component.css'
})
export class InstitutionsManagementComponent {
  @Input() compConfig: any = null;

}
