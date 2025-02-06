import { Component, Input } from '@angular/core';
import { PageTitleComponent } from '../../appwide/page-title/page-title.component';

import { ClarityModule } from '@clr/angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AdminService } from '../../../_services/admin.service';
import { firstValueFrom } from 'rxjs';
import { FormRendererComponent } from '../../appwide/form-renderer/form-renderer.component';
import { FormsSchemasService } from '../../../_services/forms-schemas.service';
import { AcademicsService } from '../../../_services/academics.service';

@Component({
  selector: 'app-departments-courses-management',
  standalone: true,
  imports: [PageTitleComponent, ClarityModule, NzButtonModule, FormRendererComponent],
  templateUrl: './departments-courses-management.component.html',
  styleUrl: './departments-courses-management.component.css'
})
export class DepartmentsCoursesManagementComponent {
  @Input() compConfig = null;

  departments: any;
  courses: any;

  courseFormFields: any;
  courseFormData: any;

  addDepartmentModal: boolean = false;
  addCourseModal: boolean = false;

  departmentName: string = "";
  selectedDepartmentId: string = "";

  constructor(private academicsService: AcademicsService, private formService: FormsSchemasService){
  }

  async ngOnInit() {
    this.departments = await firstValueFrom(this.academicsService.getDepartments());
    this.courses = await firstValueFrom(this.academicsService.getAllCourses());
    this.courseFormFields = await firstValueFrom(this.formService.getFormsAndSchemas("add_course"));
}

openAddDepartmentModal() {
  this.addDepartmentModal = true;
}

setDepartmentName(e: any) {
  this.departmentName = e.target.value;
}

handleAddDepartmentAdd() {
  this.addDepartmentModal = false;
  this.academicsService.addDepartment(this.departmentName).subscribe();
  this.departments.push({ dept: this.departmentName });
}

deleteDepartment(department: any) {
  this.academicsService.deleteDepartment(department._id).subscribe();
  this.departments.splice(this.departments.indexOf(department), 1);
}

openAddCourseModal() {
  this.addCourseModal = true;
}

handleAddCourseAdd() {
  this.addCourseModal = false;
  let newCourse = { ...this.courseFormData.fields, department: this.selectedDepartmentId };
  this.academicsService.addCourse(newCourse).subscribe();
  this.courses.push(newCourse);
}

selectDepartmentName(e: any) {
  this.selectedDepartmentId = e.target.value;
}

deleteCourse(course: any) {
  this.academicsService.deleteCourse(course._id).subscribe();
  this.courses.splice(this.courses.indexOf(course), 1);
}

}
