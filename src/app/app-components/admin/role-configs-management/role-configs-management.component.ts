import { Component, Input } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { ClarityModule } from '@clr/angular';

import { PageTitleComponent } from '../../appwide/page-title/page-title.component';
import { InformationTabComponent } from './information-tab/information-tab.component';
import { NavigationEntriesTabComponent } from './navigation-entries-tab/navigation-entries-tab.component';
import { ComponentsTabComponent } from './components-tab/components-tab.component';
import { AdminService } from '../../../_services/admin.service';
import { ActiveInstitutionService } from '../../../_services/active-institution.service';

@Component({
  selector: 'app-role-configs-management',
  standalone: true,
  imports: [ClarityModule, PageTitleComponent, NavigationEntriesTabComponent, ComponentsTabComponent],
  templateUrl: './role-configs-management.component.html',
  styleUrl: './role-configs-management.component.css'
})
export class RoleConfigsManagementComponent {
  @Input() compConfig: any;
  roles: any = [];
  institutionIid: string = "";
  roleConfig: any = null;
  selectedRole: string = "";
  addRoleModal: boolean = false;

  constructor(private adminService: AdminService, private activeInstitution: ActiveInstitutionService) {
    activeInstitution.institutionIid.subscribe(data => {
      this.institutionIid = data
    });
  }

  async ngOnInit() {
    //if no institution is selected, return
    if (this.institutionIid === 'null')
      return;

    //get all roles
    this.roles = await firstValueFrom(this.adminService.getRoles());
  }

  async addNewRole(role: string) {
    //close the modal and add the role
    this.addRoleModal = false;

    this.adminService.addRole(role).subscribe(async data => {
      console.log("Role added: ", data);

      //refresh roles
      this.roles = await firstValueFrom(this.adminService.getRoles());
    });

  }

  async deleteRole(role: string) {
    this.adminService.deleteRole(role).subscribe(async data => {
      console.log("Role deleted: ", data);

      //refresh roles
      this.roles = await firstValueFrom(this.adminService.getRoles());
    });

  }

  async selectRole(role: string) {
    this.roleConfig = await firstValueFrom(this.adminService.getRoleConfig(role));
    this.selectedRole = role;
  }

  refreshComponents() {
    this.adminService.refreshComponents().subscribe();
  }

}
