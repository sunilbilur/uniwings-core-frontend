import { Component, Input } from '@angular/core';

import { DndModule } from 'ngx-drag-drop';

import { ClarityModule } from '@clr/angular';
import { ClarityIcons, dragHandleIcon } from '@cds/core/icon';

import { CompElementComponent } from './utilities/comp-element/comp-element.component';

ClarityIcons.addIcons(dragHandleIcon);

@Component({
  selector: 'app-components-tab',
  standalone: true,
  imports: [ClarityModule, DndModule, CompElementComponent],
  templateUrl: './components-tab.component.html',
  styleUrl: './components-tab.component.css'
})
export class ComponentsTabComponent {
  @Input() roleConfig: any = null;
  currentPriEntry: any = null;
  currentSecEntry: any = null;
  compEditModal: boolean = false;
  dropPositionIndex: number = 0;

  constructor() {

  }

  openCompEditModal(entry: any) {
    this.compEditModal = true;
    this.currentSecEntry = entry;
  }

  updateCompItem(newItem: any, compItem: any) {
    newItem = compItem;
    console.log("compItem: ", compItem);
  }

  selectPriEntry(node: any, priEntry: any) {
    this.currentPriEntry = priEntry;
  }

  onDragged(index: any, list: any[]) {
    console.log("onDragged INDEX: ", index);
    if (this.dropPositionIndex > index) {
      list.splice(index, 1);
    } else {
      list.splice(index + 1, 1);
    }
  }

  onDragStart() {
    console.log("onDragStart");
  }

  onDrop(event: any, list: any, holder: any) {
    this.dropPositionIndex = event.index;

    console.log("onDrop: ", event);
    console.log("holder: ", holder);

    if (holder === "toplevel") {
      //can only contain row and component
      if (event.data === "row") {
        list.splice(event.index, 0, ["row"]);
      } else if (event.data === "component") {
        list.splice(event.index, 0, ["component", {}]);
      } else if (event.data === "col") {
        console.log("rowcomp: error");
      } else if (event.data[0] !== "col") {
        console.log("rearragnement in rowcomp, executed");
        list.splice(event.index, 0, event.data);
      } else {
        console.log("rowcomp: error");
      }
    } else if (holder === "row") {
      //can only contain col
      if (event.data === "col") {
        list.splice(event.index + 1, 0, ["col", 12]);
      } else if (event.data[0] !== "row" && event.data[0] !== "component") {
        console.log("rearragnement in row, executed");
        list.splice(event.index + 1, 0, event.data);
      } else {
        console.log("col: error");
      }
    } else if (holder === "col") {
      //can only contain row and component
      if (event.data === "row") {
        list.splice(event.index + 2, 0, ["row"]);
      } else if (event.data === "component") {
        list.splice(event.index + 2, 0, ["component", {}]);
      } else if (event.data === "col") {
        console.log("rowcomp: error");
      } else if (event.data[0] !== "col") {
        console.log("rearragnement in col, executed");
        list.splice(event.index + 2, 0, event.data);
      } else {
        console.log("rowcomp: error");
      }
    } else if (holder === "lastcol") {
      if (event.data === "component") {
        list.splice(event.index + 2, 0, ["component", {}]);
      } else if (event.data === "col" || event.data === "row") {
        console.log("lastcol: error");
      } else if (event.data[0] !== "col" && event.data[0] !== "row") {
        console.log("rearragnement in col, executed");
        list.splice(event.index + 2, 0, event.data);
      } else {
        console.log("lastcol: error");
      }
    } else {
      console.log("holder: error");
    }

  }
}

