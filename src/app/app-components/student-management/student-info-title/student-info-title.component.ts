import { Component } from '@angular/core';
import { PageTitleComponent } from '../../appwide/page-title/page-title.component';

@Component({
  selector: 'app-student-info-title',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './student-info-title.component.html',
  styleUrl: './student-info-title.component.css'
})

export class StudentInfoTitleComponent {

}
