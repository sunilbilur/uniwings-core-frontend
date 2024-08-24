import { Component } from '@angular/core';
import { PageTitleComponent } from '../../appwide/page-title/page-title.component';
import { PageSubtitleComponent } from '../../appwide/page-subtitle/page-subtitle.component';

@Component({
  selector: 'app-student-info-title',
  standalone: true,
  imports: [PageTitleComponent, PageSubtitleComponent],
  templateUrl: './student-info-title.component.html',
  styleUrl: './student-info-title.component.css'
})

export class StudentInfoTitleComponent {

}
