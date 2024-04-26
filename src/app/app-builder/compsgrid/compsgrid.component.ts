import { NgComponentOutlet } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-compsgrid',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './compsgrid.component.html',
  styleUrl: './compsgrid.component.css'
})
export class CompsgridComponent implements OnInit, OnDestroy {
  state: number = 0;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log("[log] created compsgrid in router-outlet of AppBuilderComponent");
    console.log("compsData: ",this.route.snapshot.data['compsData']);
  }

  ngOnDestroy(): void {
    console.log("[log] destroyed compsgrid");
  }

  incState() {
    this.state += 1;
  }
}
