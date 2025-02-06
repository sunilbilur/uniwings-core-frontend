import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PageTitleComponent } from '../../appwide/page-title/page-title.component';
import { AdminService } from '../../../_services/admin.service';

import { ClarityModule } from '@clr/angular';
import { firstValueFrom } from 'rxjs';
import { ActiveInstitutionService } from '../../../_services/active-institution.service';

@Component({
  selector: 'app-institutions-management',
  standalone: true,
  imports: [PageTitleComponent, FormsModule, ClarityModule],
  templateUrl: './institutions-management.component.html',
  styleUrl: './institutions-management.component.css'
})
export class InstitutionsManagementComponent {
  @Input() compConfig: any = null;
  institutions: any = [];

  constructor(private adminService: AdminService, private activeInstitution: ActiveInstitutionService) {
  }

  async ngOnInit() {
    this.institutions = await firstValueFrom(this.adminService.getInstitutions());
  }

  connectInstitution(institution: any) {
    this.activeInstitution.setInstitutionIid(institution.iid);
    this.activeInstitution.setInstitutionName(institution.name);
  }

}
