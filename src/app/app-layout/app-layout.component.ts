import { Component, OnDestroy, OnInit, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ContentContainerComponent } from './content-container/content-container.component';
import { AuthService } from '../_services/auth.service';

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
  selector: 'app-app-builder',
  standalone: true,
  imports: [RouterModule, ClarityModule, ContentContainerComponent],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None
})
export class AppLayoutComponent implements OnInit, OnDestroy {

  // AppBuilder gets navData from login
  // navData is passed from AppBuilder to NavBar
  priNav: any = null;
  userFullname: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.priNav = this.route.snapshot.data['priNav'];
    this.userFullname = this.route.snapshot.data['name'];
  }

  ngOnDestroy(): void {
    console.log("[log] app-builder.component.ts || appBuilder destroyed");
  }

  logoutUser() {
    this.authService.logout();
  }
}
