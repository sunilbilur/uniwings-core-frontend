import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { PageTitleComponent } from "../../appwide/page-title/page-title.component";
import { AdminService } from '../../../_services/admin.service';
import { ActiveInstitutionService } from '../../../_services/active-institution.service';
import { firstValueFrom } from 'rxjs';

import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { ClarityModule } from '@clr/angular';
import { active } from '@cds/core/internal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forms-schemas-management',
  standalone: true,
  imports: [PageTitleComponent, NzButtonComponent, NzModalModule, NzInputModule, NzFormModule, NzTagModule, NzSelectModule,
    ClarityModule],
  templateUrl: './forms-schemas-management.component.html',
  styleUrl: './forms-schemas-management.component.css',
})
export class FormsSchemasManagementComponent {
  @Input() compConfig = null;

  newFormSchemaName: any;
  editedFormSchemaName: any;
  oldFormSchemaName: any;

  formsAndSchemas: any[] = [];
  selectedFormOrSchema: any = null;
  activeInstitutionId: string = "";

  addFormModal: boolean = false;
  addFieldModal: boolean = false;
  deleteConfirmationModal: boolean = false;
  activeFieldArr: any;
  activeFieldIndex: any;

  newFieldData: any = {
    name: "",
    type: "",
  };
  editFormNameModal: boolean = false;

  constructor(private adminService: AdminService, private toastr: ToastrService,
    private activeInstitution: ActiveInstitutionService) {
    activeInstitution.institutionIid.subscribe(data => {
      this.activeInstitutionId = data
    })
  }

  async ngOnInit() {
    if (this.activeInstitutionId !== "null") {
      this.formsAndSchemas = await firstValueFrom(this.adminService.getFormsAndSchemas());
    }
    console.log(this.formsAndSchemas);
  }

  setNewFormSchemaName(e: any) {
    this.newFormSchemaName = e.target.value;
  }

  async handleAddFormModalAdd() {
    this.addFormModal = false;
    this.adminService.addNewFormSchema(this.newFormSchemaName).subscribe();
    this.formsAndSchemas.push({ name: this.newFormSchemaName, fields: [] });
  }

  openEditFormNameModal(formOrSchema: any) {
    this.editFormNameModal = true;
    this.selectedFormOrSchema = formOrSchema;
    this.oldFormSchemaName = formOrSchema.name;
    this.editedFormSchemaName = formOrSchema.name;
  }

  setEditFormName(e: any) {
    this.editedFormSchemaName = e.target.value;
  }

  handleEditFormNameModalSave() {
    this.editFormNameModal = false;
    this.selectedFormOrSchema.name = this.editedFormSchemaName;

    console.log("THIS IS SELCTE: ", this.selectedFormOrSchema);
    this.adminService.updateFormSchema(this.oldFormSchemaName, this.selectedFormOrSchema).subscribe();
  }

  openDeleteConfirmationModal(formOrSchema: any) {
    this.deleteConfirmationModal = true;
    this.selectedFormOrSchema = formOrSchema;
  }

  handleDeleteConfirmationModalConfirm() {
    this.deleteConfirmationModal = false;
    this.adminService.deleteFormSchema(this.selectedFormOrSchema.name).subscribe();
    this.formsAndSchemas = this.formsAndSchemas.filter((formOrSchema: any) => formOrSchema.name !== this.selectedFormOrSchema.name);
  }

  selectFormOrSchema(formOrSchema: any) {
    this.selectedFormOrSchema = formOrSchema;
  }

  openAddFieldModal(arr: any, index: any) {
    this.addFieldModal = true;
    this.activeFieldArr = arr;
    this.activeFieldIndex = index;
    this.newFieldData = {};
  }

  addNewRow(arr: any, index: any) {
    arr.splice(index + 1, 0, ["row"]);
  }

  setNewFieldName(fieldName: any) {
    this.newFieldData.name = fieldName;
  }

  setNewFieldSelectedType(e: any) {
    this.newFieldData.type = e.target.value;
  }

  setNewFieldSelectedInputType(e: any) {
    this.newFieldData.input_type = e.target.value;
  }

  setNewFieldExternal(e: any) {
    if (e.target.value === "true") {
      this.newFieldData.external = "";
    } else {
      delete this.newFieldData.external;
    }
  }

  checkExistence(obj: any) {
    return obj !== undefined;
  }

  setFieldName(field: any, e: any) {
    field.name = e.target.value;
  }

  setFieldOption(field: any, index: any, e: any) {
    field.options[index] = e.target.value;
  }

  setFieldExternal(field: any, e: any) {
    field.external = e.target.value;
  }

  handleAddFieldModalAdd() {
    this.addFieldModal = false;
    console.log(this.activeFieldArr, this.activeFieldIndex);
    this.activeFieldArr.splice(this.activeFieldIndex + 1, 0, this.newFieldData);
    console.log(this.activeFieldArr);
  }

  deleteField(arr: any, index: any) {
    console.log("Array is:", arr);
    arr.splice(index, 1);
  }

  addField(item: any) {
    if (item.options === undefined) {
      item.options = [];
    }
    item.options.push("null");
  }

  submitForm() {
    console.log("form data: ", this.selectedFormOrSchema);
    this.adminService.updateFormSchema(this.selectedFormOrSchema.name, this.selectedFormOrSchema).subscribe(
      data => {
        if(data.status === "success") {
          this.toastr.success("Form updated successfullly");
        }
      },
      error => {
        this.toastr.error("Something went wrong");
      }
    );
  }

}
