import { Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';

import { DndDropEvent, DndModule } from 'ngx-drag-drop';

import { AdminService } from '../../../../_services/admin.service';

import { ClarityIcons, dragHandleIcon, eraserIcon, pencilIcon, plusIcon } from '@cds/core/icon';
import { ClarityModule } from '@clr/angular';
import { ToastrService } from 'ngx-toastr';

ClarityIcons.addIcons(plusIcon);
ClarityIcons.addIcons(pencilIcon);
ClarityIcons.addIcons(eraserIcon);
ClarityIcons.addIcons(dragHandleIcon);

@Component({
  selector: 'app-navigation-entries-tab',
  standalone: true,
  imports: [DndModule, ClarityModule, NgForOf],
  templateUrl: './navigation-entries-tab.component.html',
  styleUrl: './navigation-entries-tab.component.css'
})
export class NavigationEntriesTabComponent {
  @Input() roleConfig: any = null;
  currentPriEntry: any = null;
  currentSecEntry: any = null;
  tempRouteCounter: number = 1;

  skipDeletion: boolean = false;

  constructor(private adminService: AdminService, private toastr: ToastrService) {

  }

  ngOnInit() {
    console.log("from navigation entries tab: ",this.roleConfig);
  }

  addPriEntry() {
    this.roleConfig.pri_nav.push({ name: "", route: "temp-route-"+this.tempRouteCounter});
    this.roleConfig.sec_nav["temp-route-"+this.tempRouteCounter] = [];
  }

  deletePriEntry(index: number) {
    this.roleConfig.pri_nav.splice(index, 1);
    this.currentPriEntry = null;
  }

  selectPriEntry(priEntry: { name: string; route: string; }) {
    this.currentSecEntry = null;
    this.currentPriEntry = priEntry;
  }

  selectSecEntry(secEntry: any) {
    if(secEntry.type === "entry") {
    this.currentSecEntry = secEntry;
    }
  }

  setPriEntryName(name: string) {
    this.currentPriEntry.name = name;
  }

  setSecEntryName(e: any) {
    this.currentSecEntry.name = e.target.value;
  }

  setSecEntryRouteName(e: any) {
    this.currentSecEntry.route = e.target.value;
  }

  setSecEntryIconName(e: any) {
    this.currentSecEntry.icon = e.target.value;
  }

  deleteSecEntry(index: number) { 
    this.roleConfig.sec_nav[this.currentPriEntry.route].splice(index, 1);
  }

  deleteSecMenuEntry(list: any, index: number) {
    list.splice(index, 1);
  }

  onDragged(item: any, type: string, list: any) {
    console.log("dragged: ", item);
    if(this.skipDeletion) {
      this.skipDeletion = false;
      return;
    }
    list.splice(list.indexOf(item), 1);
  }

  onDrop(event: DndDropEvent, list: any, dropPlace: any) {
    console.log("drop: ", event);
    let i = list.indexOf(event.data);

    if (event.data === "entry") {
      list.splice(event.index, 0, {type: "entry", name: "", route: "" , comp: [], icon: ""});
    }
    else if (event.data === "menu") {
      list.splice(event.index, 0, { type: "menu", name: "", entries: [], icon: "" });
    }
    else {
      console.log("rearrangement executed");
      if(dropPlace === "menu" && event.data.type === "menu") {
        this.skipDeletion = true;
        return;
      }
      list.splice(event.index, 0, event.data);
    }
  }

  saveChanges() {
    this.adminService.updateRoleConfig(this.roleConfig.role, this.roleConfig).subscribe(
      () => {
        this.toastr.success("Changes saved successfully");
      },
      () => {
        this.toastr.error("Something went wrong");
      }
    );
    console.log("role config: ", this.roleConfig);
  }

}
