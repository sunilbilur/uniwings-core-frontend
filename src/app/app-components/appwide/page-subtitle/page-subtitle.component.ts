import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-page-subtitle',
  standalone: true,
  imports: [],
  templateUrl: './page-subtitle.component.html',
  styleUrl: './page-subtitle.component.css'
})
export class PageSubtitleComponent {
  @Input() subtitle = '';

}
