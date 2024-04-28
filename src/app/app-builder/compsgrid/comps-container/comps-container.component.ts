import { Component, Input, OnInit } from '@angular/core';

import { CompsHtmlFetcherService } from '../../../_services/comps-html-fetcher.service';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-comps-container',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './comps-container.component.html',
  styleUrl: './comps-container.component.css'
})
export class CompsContainer implements OnInit {
  @Input() children: any = null;
  @Input() css: any = null;
  comps: any = {};
  compConfig: any = null;
  comp_id: number = 0;

  constructor(private compsHtmlFetcher: CompsHtmlFetcherService) {
    console.log("[log] inside col component");
  }

  getid() {
    return this.comp_id + 1;
  }

  async ngOnInit() {
    console.log("[log] compsData in col: ", this.children);
    console.log("[log] col created");

    for (let child of this.children) {
      let temp_comp: any; 
      if (child[0] != 'c') {
        this.compConfig = this.children[1];
        temp_comp = await this.compsHtmlFetcher.fetch(child[0]);
        this.comps[child[0]]=temp_comp;
      }
    }
  }
}
