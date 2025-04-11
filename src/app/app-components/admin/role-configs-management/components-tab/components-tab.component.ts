import { Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';

import { DndModule } from 'ngx-drag-drop';

import { ClarityModule } from '@clr/angular';
import { ClarityIcons, dragHandleIcon } from '@cds/core/icon';
import { AdminService } from '../../../../_services/admin.service';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

ClarityIcons.addIcons(dragHandleIcon);

@Component({
  selector: 'app-components-tab',
  standalone: true,
  imports: [ClarityModule, DndModule, NgForOf],
  templateUrl: './components-tab.component.html',
  styleUrl: './components-tab.component.css'
})
export class ComponentsTabComponent {
  @Input() roleConfig: any = null;

  components: any = [];
  showComponents: any = [];
  currentPriEntry: any = null;
  currentSecEntry: any = null;

  selectedComponent: any = null;
  selectedComponentName: any = null;
  selectComponentDrawer: boolean = false;
  searchQuery: any = null;

  compEditModal: boolean = false;
  dropPositionIndex: number = 0;

  skipDeletion: boolean = false;

  constructor(private adminService: AdminService, private toastr: ToastrService) {
  }

  async ngOnInit() {
    this.components = await firstValueFrom(this.adminService.getComponentsList());
  }

  setColumnWidth(colElem: any, event: any) {
    //convert target.value to number and assign to colElem
    colElem[1] = parseInt(event.target.value);
    console.log("setColumnWidth: ", colElem);
    console.log("setColumnWidth: ", event.target.value);
    console.log("ROLECONFIG: ", this.roleConfig);
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

  onDragged(item: any, list: any[]) {
    console.log("onDragged INDEX: ", item);
    if (!this.skipDeletion) {
      list.splice(list.indexOf(item), 1)
    }

    this.skipDeletion = false;
  }

  openSelectComponentDrawer(item: any) {
    this.showComponents = this.components;
    this.selectedComponentName = null;
    this.selectComponentDrawer = true;
    this.selectedComponent = item;
  }

  setComponent() {
    this.selectComponentDrawer = false;
    this.selectedComponent[0] = this.selectedComponentName;
    console.log("setComponent: ", this.selectedComponent);
  }

  setSearchQuery(query: any) {
    this.searchQuery = query.target.value;
  }

  searchComponent() {
    console.log(this.components);
    this.showComponents = this.components.filter((item: any) => item.comp_name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  onDrop(event: any, list: any, holder: any) {
    this.dropPositionIndex = event.index;

    console.log("onDrop: ", event);
    console.log("holder: ", holder);

    if (holder === "toplevel") {
      //can only contain row and component
      if (typeof event.data === "string") {
        if (event.data === "row") {
          list.splice(event.index, 0, ["row"]);
        } else if (event.data === "component") {
          list.splice(event.index, 0, ["component", {}]);
        } else if (event.data === "col") {
          console.log("toplevel: invalid data insertion");
        }
      } else {
        if (event.data[0] !== "col") {
          list.splice(event.index, 0, event.data);
        } else {
          console.log("toplevel: invalid data insertion");
          this.skipDeletion = true;
        }
      }

    } else if (holder === "row") {
      //can only contain col
      if (typeof event.data === "string") {
        if (event.data === "col") {
          list.splice(event.index + 1, 0, ["col", 12]);
        } else {
          console.log("row: invalid data insertion")
        }
      } else {
        if (event.data[0] === "col") {
          list.splice(event.index + 1, 0, event.data);
        } else {
          console.log("row: invalid data insertion")
          this.skipDeletion = true;
        }
      }
    } else if (holder === "col") {
      //can only contain row and component
      if (typeof event.data === "string") {
        if (event.data === "row") {
          list.splice(event.index + 2, 0, ["row"]);
        } else if (event.data === "component") {
          list.splice(event.index + 2, 0, ["component", {}]);
        } else {
          console.log("col: invalid data insertion");
        }
      } else {
        if (event.data[0] === "row" || event.data[0] !== "col") {
          list.splice(event.index + 2, 0, event.data);
        } else {
          console.log("col: invalid data rearragnement");
          this.skipDeletion = true;
        }
      }
    } else if (holder === "lastcol") {
      if (typeof event.data === "string") {
        if (event.data === "component") {
          list.splice(event.index + 2, 0, ["component", {}]);
        } else {
          console.log("lastcol: invalid data insertion")
        }
      } else {
        if (event.data[0] !== "row" && event.data[0] !== "col") {
          list.splice(event.index + 2, 0, event.data);
        } else {
          console.log("lastcol: invalid data insertion")
          this.skipDeletion = true;
        }
      }
    } else {
      console.log("holder: error");
    }
  }  

  saveChanges() {
    this.adminService.updateRoleConfig(this.roleConfig.role, this.roleConfig).subscribe(() => {
      this.toastr.success("Changes saved successfully");
    },
    () => {
      this.toastr.error("Something went wrong");
    }
  );
    console.log("role config: ", this.roleConfig);
    this.compEditModal = false;
  }
}

