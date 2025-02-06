import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-form-renderer',
  standalone: true,
  imports: [ClarityModule],
  templateUrl: './form-renderer.component.html',
  styleUrl: './form-renderer.component.css'
})
export class FormRendererComponent {
  @Input() form: any;
  @Output() formChange = new EventEmitter<any>();
  formData: any = {
    fields: {}
  }

  constructor() { 
  }

  ngOnInit() {
    console.log("ngOnInit form-renderer: ", this.form);
  }

  setInputValue(item: any, ref: any) {
    //suppose if item.name is like "Hello World" convert it to hello_world
    let fieldName = item.name.split(" ").map((word: string) => word.toLowerCase()).join("_");
    this.formData.fields[fieldName] = ref.value;
    this.formChange.emit(this.formData);
  }

  setRadioValue(item: any, value: any) {
    let fieldName = item.name.split(" ").map((word: string) => word.toLowerCase()).join("_");
    this.formData.fields[fieldName] = value;
    this.formChange.emit(this.formData);
  }

  setDateValue(item: any, ref: any) {
    let fieldName = item.name.split(" ").map((word: string) => word.toLowerCase()).join("_");
    this.formData.fields[fieldName] = ref.value;
    this.formChange.emit(this.formData);
  }

  setTextareaValue(item: any, ref: any) {
    let fieldName = item.name.split(" ").map((word: string) => word.toLowerCase()).join("_");
    this.formData.fields[fieldName] = ref.value;
    this.formChange.emit(this.formData);
  }

  setSelectValue(item: any, ref: any) {
    let fieldName = item.name.split(" ").map((word: string) => word.toLowerCase()).join("_");
    this.formData.fields[fieldName] = ref.value;
    this.formChange.emit(this.formData);
  }

}
