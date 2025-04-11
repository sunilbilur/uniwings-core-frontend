import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PageTitleComponent } from '../../appwide/page-title/page-title.component';
import { AdminService } from '../../../_services/admin.service';

import { ClarityModule } from '@clr/angular';
import { firstValueFrom } from 'rxjs';
import { ActiveInstitutionService } from '../../../_services/active-institution.service';
import { ToastrComponentlessModule, ToastrService } from 'ngx-toastr';

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
  addInstituionModal: boolean = false;

  institutionName: string = "";
  institutionID: string = "";
  institutionShortname: string = "";

  constructor(private adminService: AdminService, private toastr: ToastrService, private activeInstitution: ActiveInstitutionService) {
  }

  async ngOnInit() {
    this.institutions = await firstValueFrom(this.adminService.getInstitutions());
  }

  connectInstitution(institution: any) {
    this.activeInstitution.setInstitutionIid(institution.iid);
    this.activeInstitution.setInstitutionName(institution.name);
  }

  addInstitution() {
    if (this.institutionName == "" || this.institutionID == "" || this.institutionShortname == "") {
      this.toastr.error("Fill all required Fields");
      return;
    }

    this.adminService.addInstitution({
      name: this.institutionName,
      iid: this.institutionID,
      shortname: this.institutionShortname
    }).subscribe((data) => {
      this.institutions.push({
        name: this.institutionName,
        iid: this.institutionID,
        shortname: this.institutionShortname
      });
      this.toastr.success("Institution added successfully");
    },
      (err) => {
        this.toastr.error("Something went wrong");
      });

    this.addInstituionModal = false;
    console.log(this.institutionName, this.institutionID, this.institutionShortname);
  }

}
