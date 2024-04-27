import { Component, Input, OnInit } from '@angular/core';

import { CompsHtmlFetcherService } from '../../../_services/comps-html-fetcher.service';
import { randomUUID } from "crypto";

@Component({
  selector: 'app-comps-container',
  standalone: true,
  imports: [],
  templateUrl: './comps-container.component.html',
  styleUrl: './comps-container.component.css'
})
export class CompsContainer implements OnInit {
  @Input() children: any = null;
  @Input() css: any = null;

  constructor(private compsHtmlFetcher: CompsHtmlFetcherService) {
    console.log("[log] inside col component");
  }

  getid(){
    return randomUUID();
  }

  ngOnInit(): void {
    console.log("[log] compsData in col: ", this.children);
    console.log("[log] col created");
  }
}
