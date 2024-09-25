import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ClarityModule } from '@clr/angular';

import { PageTitleComponent } from '../../appwide/page-title/page-title.component';
import { PageNotFoundComponent } from "../../../page-not-found/page-not-found.component";
import { ClarityIcons, syncIcon } from '@cds/core/icon';
import { firstValueFrom } from 'rxjs';
import { AdminService } from '../../../_services/admin.service';


ClarityIcons.addIcons(syncIcon)

@Component({
  selector: 'app-components-library',
  standalone: true,
  imports: [PageTitleComponent, ReactiveFormsModule, PageNotFoundComponent, ClarityModule],
  templateUrl: './components-library.component.html',
  styleUrl: './components-library.component.css'
})
export class ComponentsLibraryComponent {
  @Input() compConfig: any = null;
  componentsList: any[] = [];

  currentComp: any = null;
  compEditModalOpen: boolean = false;

  enumOptions: any = new FormArray([new FormControl('')]);

  showSyncComponentsForm: boolean = false;
  compsyncform: FormGroup = new FormGroup({
    compsyncfile: new FormControl()
  });

  currentTypeEntry: string = '';
  highlightTypeEntry: string[] = ['', ''];

  constructor(private adminService: AdminService) {
  }

  async ngOnInit() {
    this.componentsList = await firstValueFrom(this.adminService.getComponentsList());
    console.log(this.componentsList);
  }

  syncComponents() {
    this.showSyncComponentsForm = true;
  }

  cancelSyncComponents() {
    this.showSyncComponentsForm = false;
  }

  preventDefault(event: any) {
    event.preventDefault();
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('compsyncfile', this.compsyncform.get('compsyncfile')!.value);
    console.log(formData);
    console.log(this.compsyncform.get('compsyncfile')!.value);

    this.adminService.syncComponents(formData).subscribe((response) => {
      console.log(response);
    });

  }

  searchComponents(name: string) {

  }

  openCompEditModal(comp: any) {
    this.currentComp = comp;
    this.compEditModalOpen = true;
  }

  closeCompEditModal(action: string) {
    this.compEditModalOpen = false;
    this.highlightTypeEntry = ['', ''];

    if (action === "save") {
      this.adminService.updateComponent(this.currentComp).subscribe((response) => {
        console.log(response);
      });
    }
  }

  addEntry() {
    if (this.currentTypeEntry === 'enum') {
      this.currentComp.comp_config.push({ name: "", type: "enum", options: []});
    }
  }

  setHighlightTypeEntry(type: string) {
    console.log("set highlight type entry");
    switch (type) {
      case 'enum':
        this.currentTypeEntry = 'enum';
        this.highlightTypeEntry = ['highlight-type-entry', ''];
        break;
      case 'boolean':
        this.currentTypeEntry = 'boolean';
        this.highlightTypeEntry = ['', 'highlight-type-entry'];
        break;
      default:
        this.highlightTypeEntry = ['', ''];
    }
  }

  delEnumEntry(compConfig: any, enumIndex: number) {
    compConfig.splice(enumIndex, 1);
  }

  setEnumName(item: any, value: string) {
    item.name = value;
    console.log(item.name)
  }

  addNewEnumOption(item: any) {
    item.options.push('');
  }

  delEnumOption(optionsArr: any, optionIndex: number) {
    console.log(optionsArr);
    optionsArr.splice(optionIndex, 1);
    console.log(optionsArr);
  }

  setEnumOptionValue(optionsArr: any, optionIndex: number, value: string) {
    optionsArr[optionIndex] = value;
  }

}
