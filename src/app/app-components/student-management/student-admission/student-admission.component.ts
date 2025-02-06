import { Component, Input } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';

import { ClarityModule } from '@clr/angular';

import { PageTitleComponent } from '../../appwide/page-title/page-title.component';
import { AdmissionService } from '../../../_services/admission.service';
import { firstValueFrom } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-admission',
  standalone: true,
  imports: [PageTitleComponent, ClarityModule, NzButtonModule],
  templateUrl: './student-admission.component.html',
  styleUrl: './student-admission.component.css'
})
export class StudentAdmissionComponent {
  @Input() compConfig: any = null;
  fields: any = [];
  formData: any = {
    first_name: '',
    middle_name: '',
    last_name: '',
    role: 'student',
    fields: {}
  };
  options: any = {};

  constructor(private admissionService: AdmissionService, private toastr: ToastrService) {
  }

  async ngOnInit() {
    let admissionForm: any = await firstValueFrom(this.admissionService.getAdmissionFormFields());
    console.log("admission form: ", admissionForm);
    this.fields = admissionForm.fields;

    for (let field of admissionForm.fields) {
      for (let o of field.slice(1)) {
        if (o.external !== undefined) {
          this.options[o.external] = await firstValueFrom(this.admissionService.getOptions(o.external));
        }
      }
    }

    console.log("options: ", this.options);
  }

  setInputValue(item: any, ref: any) {
    console.log("fired: setInputValue");
    if (item.name == "First Name") {
      this.formData.first_name = ref.value;
    } else if (item.name == "Middle Name") {
      this.formData.middle_name = ref.value;
    } else if (item.name == "Last Name") {
      this.formData.last_name = ref.value;
    } else {
      //suppose if item.name is like "Hello World" convert it to hello_world
      let fieldName = item.name.split(" ").map((word: string) => word.toLowerCase()).join("_");
      this.formData.fields[fieldName] = ref.value;
    }
  }

  setDateText(item: any, ref: any) {
    if (ref !== null) {
      ref.value = "";
      this.formData.fields[item.name.split(" ").map((word: string) => word.toLowerCase()).join("_")] = "";
    }
  }

  setRadioValue(item: any, value: any) {
    console.log("setRadioValue fired");
    let fieldName = item.name.split(" ").map((word: string) => word.toLowerCase()).join("_");
    this.formData.fields[fieldName] = value;
  }

  setDateValue(item: any, ref: any) {
    let fieldName = item.name.split(" ").map((word: string) => word.toLowerCase()).join("_");
    if (ref !== null) {
      this.formData.fields[fieldName] = ref.toString();
    }
  }

  async getOptions(item: any) {
    this.options[item] = await firstValueFrom(this.admissionService.getOptions(item));
  }

  setTextareaValue(item: any, ref: any) {
    let fieldName = item.name.split(" ").map((word: string) => word.toLowerCase()).join("_");
    this.formData.fields[fieldName] = ref.value;
  }

  setSelectValue(item: any, ref: any) {
    let fieldName = item.name.split(" ").map((word: string) => word.toLowerCase()).join("_");
    this.formData.fields[fieldName] = ref.value;
  }

  verifyForm() {
    if (this.formData.first_name == "") {
      return false;
    }
    if (this.formData.middle_name == "") {
      return false;
    }
    if (this.formData.last_name == "") {
      return false;
    }

    for (let field of this.fields) {
      for (let o of field.slice(1)) {
        let fieldName = o.name.split(" ").map((word: string) => word.toLowerCase()).join("_");
        if (fieldName == "first_name" || fieldName == "middle_name" || fieldName == "last_name") {
          continue;
        }
        if (o.type === "title") {
          continue;
        }

        console.log(fieldName, this.formData.fields[fieldName], o);
        if (this.formData.fields[fieldName] === "" || this.formData.fields[fieldName] === undefined) {
          return false;
        }
      }
    }

    return true;
  }

  submitForm() {
    if (this.verifyForm()) {
      let res = this.admissionService.submitAdmissionForm(this.formData).subscribe((response) => {
        if (response.status == "success") {
          //show a success toast
          this.toastr.show(
            "Student added successfully",
            "Success",
            {
              timeOut: 5000,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-center',
            });
        } else {
          this.toastr.show(
            "Something went wrong",
            "Error",
            {
              timeOut: 5000,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-center',
            });
        }
      });
    } else {

      console.log("toast triggered");
      this.toastr.show(
        "Please fill out all required fields",
        "Error",
        {
          timeOut: 5000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-center',
        });
    }
    console.log(this.formData);
  }
}
