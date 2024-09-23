import { Component } from '@angular/core';

import { PageTitleComponent } from '../../appwide/page-title/page-title.component';
import { PageNotFoundComponent } from "../../../page-not-found/page-not-found.component";

@Component({
  selector: 'app-components-library',
  standalone: true,
  imports: [PageTitleComponent, PageNotFoundComponent],
  templateUrl: './components-library.component.html',
  styleUrl: './components-library.component.css'
})
export class ComponentsLibraryComponent {

}
