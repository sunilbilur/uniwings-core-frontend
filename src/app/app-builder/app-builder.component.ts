import { Component, OnDestroy, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';

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
  imports: [RouterModule, ClarityModule],
  templateUrl: './app-builder.component.html',
  styleUrl: './app-builder.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppBuilderComponent implements OnInit, OnDestroy {

  // AppBuilder gets navData from login
  // navData is passed from AppBuilder to NavBar
  navData: any = null;
  name: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.navData = this.route.snapshot.data['navData'];
    this.name = this.route.snapshot.data['name'];
  }

  ngOnDestroy(): void {
    console.log("[log] app-builder.component.ts || appBuilder destroyed");
  }

  logoutUser() {
    this.authService.logout();
  }
}
