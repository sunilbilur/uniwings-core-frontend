import { Component, Input } from '@angular/core';
import { PageTitleComponent } from "../../appwide/page-title/page-title.component";

import { ClarityModule } from '@clr/angular';
import { AdmissionService } from '../../../_services/admission.service';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-academics-change',
  standalone: true,
  imports: [PageTitleComponent, ClarityModule],
  templateUrl: './student-academics-change.component.html',
  styleUrl: './student-academics-change.component.css'
})
export class StudentAcademicsChangeComponent {
  @Input() compConfig = null;
  programs: any = null;
  years: any = null;
  classes: any = null;
  batches: any = null;

  selectedProgram: any = null;
  selectedFromClass: any = {
    class: null,
    batch: null,
    year: null
  }
  selectedToClass: any = {
    class: null,
    batch: null,
    year: null
  }


  constructor(private admissionService: AdmissionService, private toastr: ToastrService) {

  }
  async ngOnInit() {
    this.programs = await firstValueFrom(this.admissionService.getOptions("academic_programs"));
    this.years = await firstValueFrom(this.admissionService.getOptions("academic_year"));
    this.classes = await firstValueFrom(this.admissionService.getOptions("academic_class"));
    this.batches = await firstValueFrom(this.admissionService.getOptions("academic_batch"));
  }

  setFromProgram(ref: any) {
    this.selectedProgram = ref.value;
  }

  setClass(ref: any, ch: any, field: any) {
    if (ch === "from") {
      this.selectedFromClass[field] = ref.value;
    }
    if (ch === "to") {
      console.log("SETCLASS: ", ch, field);
      this.selectedToClass[field] = ref.value;
      console.log(this.selectedToClass)
    }
  }

  changeClass() {
    console.log("selected program: ", this.selectedProgram);
    console.log("selected from class: ", this.selectedFromClass);
    console.log("selected to class: ", this.selectedToClass);

    if(this.selectedProgram === null ||
      this.selectedFromClass.class === null ||
      this.selectedFromClass.batch === null ||
      this.selectedFromClass.year === null ||
      this.selectedToClass.class === null ||
      this.selectedToClass.batch === null ||
      this.selectedToClass.year === null)
    {
      this.toastr.error("Please select all fields");
      return;
    }

    this.admissionService.changeClass(this.selectedProgram, this.selectedFromClass, this.selectedToClass).subscribe(
      (response) => {
        if (response.status === "success") {
          this.toastr.success("Class changed successfully");
        } else {
          this.toastr.error("Something went wrong");
        }
      }
    );

  }
}
