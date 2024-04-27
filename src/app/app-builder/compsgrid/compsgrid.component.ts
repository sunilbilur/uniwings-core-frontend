import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CompsContainer } from './comps-container/comps-container.component';

@Component({
  selector: 'app-compsgrid',
  standalone: true,
  imports: [CompsContainer],
  templateUrl: './compsgrid.component.html',
  styleUrl: './compsgrid.component.css'
})
export class CompsgridComponent implements OnInit, OnDestroy {
  //compsData is recieved directly from login
  //and not from AppBuilder component unlike NavBar component
  compsData: any = null;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.compsData = this.route.snapshot.data['compsData'];
    console.log("[log] compsgrid created in router-outlet of AppBuilderComponent");
    console.log("[log] compsData from compsGrid", this.compsData);
  }

  ngOnDestroy(): void {
    console.log("[log] compsgrid destroyed");
  }

}
