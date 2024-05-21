import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ProductService } from '../../_kitcoek-services/product.service';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { StepperModule } from 'primeng/stepper';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';



@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [FormsModule, ButtonModule, CardModule, TableModule, FieldsetModule, FileUploadModule,
    InputTextModule, TabViewModule, DialogModule, RadioButtonModule, PasswordModule, CommonModule,
    SidebarModule, StepperModule, FloatLabelModule, DropdownModule, InputNumberModule],
  templateUrl: './admin-students.component.html',
  styleUrl: './admin-students.component.css'
})
export class AdminStudentsComponent implements OnInit {
  @Input() compConfig = null;
  products: any = null;

  addStudentSidebarVisible: boolean = false;
  importDialogVisible: boolean = false;
  importActiveStep: number = 0;

  firstName: string = "";
  middleName: string = "";
  lastName: string = "";
  gender: any = null;

  catOpts = [
    { name: 'Open', code: 'open' },
    { name: 'OBC', code: 'obc' },
    { name: 'SC', code: 'sc' },
    { name: 'ST', code: 'st' },
    { name: 'NT', code: 'nt' },
    { name: 'Other', code: 'other' }
  ];

  branchOpts = [
    { branch: 'Computer Sciene and Engineering', code: 'cse' },
    { branch: 'Mechanical Engineering', code: 'mech' },
    { branch: 'Civil Engineering', code: 'civ' },
    { branch: 'Electronics & Telecommunication', code: 'entc' },
    { branch: 'Electrical Engineering', code: 'ele' },
    { branch: 'BioTechnology Engineering', code: 'bio' }
  ];

  branch: any = null;
  semester: any = null;
  admissionYear: any = null;

  regNo: any = null;
  prnNo: any = null;

  password: string = "";

  constructor(private productService: ProductService) {

  }

  ngOnInit() {
    this.productService.getProductsMini().then((data) => {
      this.products = data;
    });
  }

}
