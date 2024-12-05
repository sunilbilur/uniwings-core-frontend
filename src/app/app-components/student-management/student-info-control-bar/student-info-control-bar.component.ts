import { Component, Input } from '@angular/core';

import { ClarityModule } from '@clr/angular';
import { StudentManagementService } from '../../../_services/student-management.service';
import { firstValueFrom } from 'rxjs';
import { AdmissionService } from '../../../_services/admission.service';

@Component({
  selector: 'app-student-info-control-bar',
  standalone: true,
  imports: [ClarityModule],
  templateUrl: './student-info-control-bar.component.html',
  styleUrl: './student-info-control-bar.component.css'
})
export class StudentInfoControlBarComponent {
  @Input() compConfig: any = null;
  searchQuery: string = '';
  admissionForm: any = null;
  editPanelOpened: boolean = false;
  viewPanelOpened: boolean = false;
  selectedStudent: any = null;
  searchIn: string = 'prn';
  students: any[] = [];
  formData: any = {
    firstName: '',
    middleName: '',
    lastName: '',
    role: 'student',
    fields: {}
  };



  constructor(private studentManagementService: StudentManagementService, private admissionService: AdmissionService) {
  }

  async ngOnInit() {
    this.students = await firstValueFrom(this.studentManagementService.getAllStudents());
    this.admissionForm = await firstValueFrom(this.admissionService.getAdmissionFormFields());
    console.log(this.students);
  }

  setSearchQuery(query: any) {
    this.searchQuery = query.target.value;
    console.log("searchQuery: ", this.searchQuery);
  }

  setSearchIn(query: any) {
    this.searchIn = query;
    console.log("searchIn: ", this.searchIn);
  }


  getFieldValue(fieldName: string) {
    let newFieldName = fieldName.split(" ").map((word: string) => word.toLowerCase()).join("_");
    if (this.selectedStudent.fields == undefined) {
      return "Not Found";
    } else {
      return this.selectedStudent.fields[newFieldName];
    }
  }

  setInputValue(item: any, ref: any) {
    console.log("fired: setInputValue");
    if (item.name == "First Name") {
      this.formData.firstName = ref.value;
    } else if (item.name == "Middle Name") {
      this.formData.middleName = ref.value;
    } else if (item.name == "Last Name") {
      this.formData.lastName = ref.value;
    } else {
      //suppose if item.name is like "Hello World" convert it to hello_world
      let fieldName = item.name.split(" ").map((word: string) => word.toLowerCase()).join("_");
      this.formData.fields[fieldName] = ref.value;
    }
  }

  setRadioValue(item: any, value: any) {
    let fieldName = item.name.split(" ").map((word: string) => word.toLowerCase()).join("_");
    this.formData.fields[fieldName] = value;
  }

  setDateValue(item: any, ref: any) {
    let fieldName = item.name.split(" ").map((word: string) => word.toLowerCase()).join("_");
    this.formData.fields[fieldName] = ref.value;
  }

  setTextareaValue(item: any, ref: any) {
    let fieldName = item.name.split(" ").map((word: string) => word.toLowerCase()).join("_");
    this.formData.fields[fieldName] = ref.value;
  }

  viewStudent(index: number) {
    this.selectedStudent = this.students[index];
    this.viewPanelOpened = true;
  }

  editStudent(index: number) {
    this.selectedStudent = this.students[index];
    this.editPanelOpened = true;
  }

  setSelectValue(item: any, ref: any) {
    let fieldName = item.name.split(" ").map((word: string) => word.toLowerCase()).join("_");
    this.formData.fields[fieldName] = ref.value;
  }

  deleteStudent(index: number) {

  }

  submitSearchQuery() {
    this.studentManagementService.searchStudents(this.searchQuery, this.searchIn).subscribe((response) => {
      this.students = response;
    });
  }

}
