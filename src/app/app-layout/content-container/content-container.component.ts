import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ClarityModule } from '@clr/angular';
import {
  ClarityIcons, cogIcon, vmBugIcon, userIcon, angleIcon, formIcon,
  dashboardIcon, assignUserIcon
} from '@cds/core/icon'

ClarityIcons.addIcons(cogIcon);
ClarityIcons.addIcons(vmBugIcon);
ClarityIcons.addIcons(userIcon);
ClarityIcons.addIcons(angleIcon);
ClarityIcons.addIcons(formIcon);
ClarityIcons.addIcons(dashboardIcon);
ClarityIcons.addIcons(assignUserIcon)

@Component({
  selector: 'app-content-container',
  standalone: true,
  imports: [ClarityModule, RouterModule],
  templateUrl: './content-container.component.html',
  styleUrl: './content-container.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContentContainerComponent {
  secNav: any = null;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.secNav = this.route.snapshot.data['secNav'];
  }

}
