import { Component, Input } from '@angular/core';

import { ClarityModule } from '@clr/angular';

import { PageTitleComponent } from '../../appwide/page-title/page-title.component';
import { AdmissionService } from '../../../_services/admission.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-student-admission',
  standalone: true,
  imports: [PageTitleComponent, ClarityModule],
  templateUrl: './student-admission.component.html',
  styleUrl: './student-admission.component.css'
})
export class StudentAdmissionComponent {
  @Input() compConfig: any = null;
  fields: any = [];
  formData: any = {
    firstName: '',
    middleName: '',
    lastName: '',
    role: 'student',
    fields: {}
  };

  constructor(private admissionService: AdmissionService) {
  }

  async ngOnInit() {
    let admissionForm: any = await firstValueFrom(this.admissionService.getAdmissionFormFields());
    this.fields = admissionForm.fields;
  }

  setInputValue(item: any, ref: any) {
    console.log("fired: setInputValue");
    if(item.name == "First Name") {
      this.formData.firstName = ref.value;
    }else if(item.name == "Middle Name") {
      this.formData.middleName = ref.value;
    } else if (item.name == "Last Name") {
      this.formData.lastName = ref.value;
    }else {
      //suppose if item.name is like "Hello World" convert it to hello_world
      let fieldName = item.name.split(" ").map((word: string) => word.toLowerCase()).join("_");
      this.formData.fields[fieldName] = ref.value;
    }
  }

  setRadioValue(item: any, value: any) {
    console.log("setRadioValue fired");
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

  setSelectValue(item: any, ref: any) {
    let fieldName = item.name.split(" ").map((word: string) => word.toLowerCase()).join("_");
    this.formData.fields[fieldName] = ref.value;
  }

  submitForm() {
    this.admissionService.submitAdmissionForm(this.formData).subscribe();
    console.log(this.formData);
  }
}
