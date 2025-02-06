import { Component, OnDestroy, OnInit, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ContentContainerComponent } from './content-container/content-container.component';
import { AuthService } from '../_services/auth.service';

import { ClarityModule } from '@clr/angular';
import {
  ClarityIcons, cogIcon, vmBugIcon, userIcon, angleIcon, formIcon,
  dashboardIcon, assignUserIcon, bankIcon, employeeGroupIcon, libraryIcon,
  bookIcon, alarmOffIcon, successStandardIcon, organizationIcon
} from '@cds/core/icon'
import { ActiveInstitutionService } from '../_services/active-institution.service';

ClarityIcons.addIcons(cogIcon);
ClarityIcons.addIcons(vmBugIcon);
ClarityIcons.addIcons(userIcon);
ClarityIcons.addIcons(angleIcon);
ClarityIcons.addIcons(formIcon);
ClarityIcons.addIcons(dashboardIcon);
ClarityIcons.addIcons(assignUserIcon)
ClarityIcons.addIcons(employeeGroupIcon);
ClarityIcons.addIcons(bankIcon);
ClarityIcons.addIcons(libraryIcon);
ClarityIcons.addIcons(bookIcon);
ClarityIcons.addIcons(alarmOffIcon);
ClarityIcons.addIcons(successStandardIcon);
ClarityIcons.addIcons(organizationIcon);

@Component({
  selector: 'app-app-builder',
  standalone: true,
  imports: [RouterModule, ClarityModule],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  iid: any;
  priNav: any = null;
  userFullname: string = '';
  activeInstitutionName: string ='';

  constructor(
    private authService: AuthService,
    private activeInstitution: ActiveInstitutionService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.iid = this.route.snapshot.data['iid'];
    this.priNav = this.route.snapshot.data['priNav'];
    this.userFullname = this.route.snapshot.data['name'];
    console.log("[log] app-builder.component.ts || iid: ", this.iid);

    this.activeInstitution.institutionName.subscribe(data => {
      this.activeInstitutionName = data;
    });
  }

  disconnectInstitution() {
    this.activeInstitution.disconnect();
  }

  ngOnDestroy(): void {
    console.log("[log] app-builder.component.ts || appBuilder destroyed");
  }

  logoutUser() {
    this.authService.logout(this.iid);
  }
}
