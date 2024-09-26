import { Component, Input } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { ClarityModule } from '@clr/angular';

import { PageTitleComponent } from '../../appwide/page-title/page-title.component';
import { InformationTabComponent } from './information-tab/information-tab.component';
import { NavigationEntriesTabComponent } from './navigation-entries-tab/navigation-entries-tab.component';
import { ComponentsTabComponent } from './components-tab/components-tab.component';
import { AdminService } from '../../../_services/admin.service';


@Component({
  selector: 'app-role-configs-management',
  standalone: true,
  imports: [ClarityModule, PageTitleComponent, InformationTabComponent, NavigationEntriesTabComponent, ComponentsTabComponent],
  templateUrl: './role-configs-management.component.html',
  styleUrl: './role-configs-management.component.css'
})
export class RoleConfigsManagementComponent {
  @Input() compConfig: any;
  roles: any = [];
  roleConfig: any = null;
  selectedRole: string = "";

  constructor(private adminService: AdminService) {
    
  }

  async ngOnInit() {
    //get all roles
    this.roles = await firstValueFrom(this.adminService.getRoles());
  }

  async selectRole(role: string) {
    this.roleConfig = await firstValueFrom(this.adminService.getRoleConfig(role));
    this.selectedRole = role;
  }

}
