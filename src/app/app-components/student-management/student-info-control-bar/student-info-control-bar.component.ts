import { Component, Input } from '@angular/core';

import { ClarityModule } from '@clr/angular';
import { StudentManagementService } from '../../../_services/student-management.service';
import { firstValueFrom } from 'rxjs';
import { AdmissionService } from '../../../_services/admission.service';
import { ToastrService } from 'ngx-toastr';

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


  options: any = {};


  constructor(private studentManagementService: StudentManagementService,
    private toastr: ToastrService,
     private admissionService: AdmissionService) {
  }

  async ngOnInit() {
    this.students = await firstValueFrom(this.studentManagementService.getAllStudents());
    this.admissionForm = await firstValueFrom(this.admissionService.getAdmissionFormFields());
    console.log(this.students);

    for (let field of this.admissionForm.fields) {
      for (let o of field.slice(1)) {
        if (o.external !== undefined) {
          this.options[o.external] = await firstValueFrom(this.admissionService.getOptions(o.external));
        }
      }
    }
  }

  setSearchQuery(query: any) {
    this.searchQuery = query.target.value;
    console.log("searchQuery: ", this.searchQuery);
  }

  setSearchIn(query: any) {
    this.searchIn = query;
    console.log("searchIn: ", this.searchIn);
  }

  fieldLengthTwo(field: any) {
    if (field.length === 2) {
      return "full";
    }else {
      return "1/4";
    }
  }

  getFieldValue(fieldName: string, type: string) {
    let newFieldName = fieldName.split(" ").map((word: string) => word.toLowerCase()).join("_");
    if (this.selectedStudent.fields == undefined) {
      return "Not Found";
    } else {
      if (this.selectedStudent.fields[newFieldName] == undefined) {
        return "(No Data Entry)";
      }

      if(type === "date") {
        let d =new Date(this.selectedStudent.fields[newFieldName]);
        return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      }
      return this.selectedStudent.fields[newFieldName];
    }
  }

  setInputValue(item: any, ref: any) {
    console.log("fired: setInputValue");
    if (item.name == "First Name") {
      this.selectedStudent.first_name = ref.value;
    } else if (item.name == "Middle Name") {
      this.selectedStudent.middle_name = ref.value;
    } else if (item.name == "Last Name") {
      this.selectedStudent.last_name = ref.value;
    } else {
      //suppose if item.name is like "Hello World" convert it to hello_world
      let fieldName = item.name.split(" ").map((word: string) => word.toLowerCase()).join("_");
      this.selectedStudent.fields[fieldName] = ref.value;
    }
  }

  setRadioValue(item: any, value: any) {
    let fieldName = item.name.split(" ").map((word: string) => word.toLowerCase()).join("_");
    this.selectedStudent.fields[fieldName] = value;
  }

  setDateValue(item: any, ref: any) {
    let fieldName = item.name.split(" ").map((word: string) => word.toLowerCase()).join("_");
    this.selectedStudent.fields[fieldName] = ref.value;
  }

  setTextareaValue(item: any, ref: any) {
    let fieldName = item.name.split(" ").map((word: string) => word.toLowerCase()).join("_");
    this.selectedStudent.fields[fieldName] = ref.value;
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
    this.selectedStudent.fields[fieldName] = ref.value;
  }

  deleteStudent(index: number) {
    this.admissionService.deleteStudent(this.students[index]._id).subscribe();
    this.students.splice(index, 1);
  }

  submitSearchQuery() {
    this.studentManagementService.searchStudents(this.searchQuery, this.searchIn).subscribe((response) => {
      this.students = response;
    });
  } 
  submitEditForm() {
    this.editPanelOpened = false;
    this.admissionService.updateAdmissionForm(this.selectedStudent._id, this.selectedStudent).subscribe(
      data => {
        console.log("HELLO THERE");
        this.toastr.success('Student Updated Successfully');
      },
      error => {
        this.toastr.error('Something went wrong');
      }
    );
    console.log(this.selectedStudent);
  }

}
