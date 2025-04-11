import { Component, Input } from '@angular/core';
import { PageTitleComponent } from "../../appwide/page-title/page-title.component";
import { ActiveInstitutionService } from '../../../_services/active-institution.service';
import { AdminService } from '../../../_services/admin.service';
import { firstValueFrom } from 'rxjs';

import { NzButtonComponent } from 'ng-zorro-antd/button';
import { ClarityModule } from '@clr/angular';
import { FormRendererComponent } from '../../appwide/form-renderer/form-renderer.component';
import { FormsSchemasService } from '../../../_services/forms-schemas.service';

@Component({
  selector: 'app-programs-classes-management',
  standalone: true,
  imports: [PageTitleComponent, NzButtonComponent, ClarityModule, FormRendererComponent],
  templateUrl: './programs-classes-management.component.html',
  styleUrl: './programs-classes-management.component.css'
})

export class ProgramsClassesManagementComponent {
  @Input() compConfig = null;
  activeInstitutionId: any = null;
  programs: any = [];
  classes: any = [];

  addProgramModal: boolean = false;
  addClassesModal: boolean = false;

  activeClassesOption: string = "Program";
  activeClassesName: string = "";
  activeClassesArray: any = [];

  programFormFields: any;
  programFormData: any;

  constructor(private adminService: AdminService, private formService: FormsSchemasService, private activeInstitutionService: ActiveInstitutionService) {
    console.log("SDLFJSODIF");
  }

  async ngOnInit() {
    this.programs = await firstValueFrom(this.adminService.getPrograms());
    this.classes = await firstValueFrom(this.adminService.getClasses());
    console.log("CLASSES: ", this.classes);
    console.log("PROGRAMS: ", this.programs);
    this.programFormFields = await firstValueFrom(this.formService.getFormsAndSchemas("add_program"));

    if (this.classes.length == 0) {
      console.log("ESLJFDLKSD EXECUTED");
      this.classes = {
        years: [],
        batches: [],
        classes: []
      };
    } else {
      this.classes = this.classes[0];
      console.log("SWITCH MADE");
      console.log(this.classes);
    }

  }

  openAddClassesModal(option: any, arr: any) {
    this.activeClassesOption = option;
    this.activeClassesArray = arr;

    this.addClassesModal = true;
  }

  setActiveClassesName(e: any) {
    this.activeClassesName = e.target.value;
  }

  handleAddClassesAdd() {
    this.activeClassesArray.push(this.activeClassesName);
    this.addClassesModal = false;
    console.log(this.activeClassesArray);
    console.log(this.activeClassesName)
    this.adminService.addClass(this.activeClassesOption.toLowerCase(), this.activeClassesName).subscribe();
  }

  handleAddProgram() {
    this.addProgramModal = false;

    this.programs.push({
      name: this.programFormData.fields.program,
      degree: this.programFormData.fields.degree
    });

    this.adminService.addProgram({
      name: this.programFormData.fields.program,
      degree: this.programFormData.fields.degree
    }).subscribe();
  }

  deleteProgram(program: any) {
    this.programs.splice(this.programs.indexOf(program), 1);
    this.adminService.deleteProgram(program._id).subscribe();
  }

  deleteClass(option: any, arr: any, cl: any) {
    arr.splice(arr.indexOf(cl), 1);
    this.adminService.deleteClass(option.toLowerCase(), cl).subscribe();
  }

}
