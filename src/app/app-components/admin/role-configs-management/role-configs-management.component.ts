import { Component, Input } from '@angular/core';
import { ClarityModule } from '@clr/angular';

import { PageTitleComponent } from '../../appwide/page-title/page-title.component';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../../_services/admin.service';
import { firstValueFrom } from 'rxjs';

import { ClarityIcons, dragHandleIcon, eraserIcon, pencilIcon, plusIcon } from '@cds/core/icon';

ClarityIcons.addIcons(plusIcon);
ClarityIcons.addIcons(pencilIcon);
ClarityIcons.addIcons(eraserIcon);
ClarityIcons.addIcons(dragHandleIcon);

@Component({
  selector: 'app-role-configs-management',
  standalone: true,
  imports: [PageTitleComponent, ClarityModule],
  templateUrl: './role-configs-management.component.html',
  styleUrl: './role-configs-management.component.css'
})
export class RoleConfigsManagementComponent {
  @Input() compConfig: any;
  roles: any = [];
  roleConfig: any = null;
  selectedRole: string = "(Please select a role)";
  currentPriEntry: string = "(Please select a primary entry)";

  constructor(private http: HttpClient, private adminService: AdminService) {

  }

  async ngOnInit() {
    //get all roles
    this.roles = await firstValueFrom(this.adminService.getRoles());
  }

  async selectRole(item: { role: string; }) {
    this.selectedRole = item.role;
    this.roleConfig = await firstValueFrom(this.adminService.getRoleConfig(this.selectedRole));

    console.log("roleConfig: ",this.roleConfig);

  }

  addPriEntry() {
    this.roleConfig.pri_nav.push({name: "", route: ""});
  }

  selectPriEntry(priEntry: string) {
    console.log("selected pri: ", priEntry);
    this.currentPriEntry = priEntry;

  }

}
