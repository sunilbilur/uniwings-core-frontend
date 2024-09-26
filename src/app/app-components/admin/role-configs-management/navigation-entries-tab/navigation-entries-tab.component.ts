import { Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';

import { DndDropEvent, DndModule } from 'ngx-drag-drop';

import { AdminService } from '../../../../_services/admin.service';

import { ClarityIcons, dragHandleIcon, eraserIcon, pencilIcon, plusIcon } from '@cds/core/icon';
import { ClarityModule } from '@clr/angular';

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

  constructor(private adminService: AdminService) {

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

  setSecEntryName(name: string) {
    this.currentSecEntry.name = name;
    console.log("current sec entry: ", this.currentSecEntry);
  }

  setSecEntryRouteName(route: string) {
    this.currentSecEntry.route = route;
    console.log("current sec entry: ", this.currentSecEntry);
  }

  deleteSecEntry(index: number) { 
    this.roleConfig.sec_nav[this.currentPriEntry.route].splice(index, 1);
  }

  deleteSecMenuEntry(list: any, index: number) {
    list.splice(index, 1);
  }

  onDragged(item: any, type: string, list: any) {
    console.log("dragged: ", item, type);
    list.splice(list.indexOf(item), 1);
  }

  onDrop(event: DndDropEvent, list: any) {
    console.log("drop: ", event);
    let i = list.indexOf(event.data);

    if (event.data === "entry") {
      list.splice(event.index, 0, {type: "entry", name: "", route: "" , comp: "", icon: ""});
    }
    else if (event.data === "menu") {
      list.splice(event.index, 0, { type: "menu", name: "", entries: [], icon: "" });
    }
    else {
      list.splice(event.index, 0, event.data);
    }
  }

}
