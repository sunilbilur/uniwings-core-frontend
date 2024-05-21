import { Component, Input, OnInit } from '@angular/core';

import { CompHtmlFetcherService } from '../../_kitcoek-services/comp-html-fetcher.service';
import { NgComponentOutlet } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comps-container',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './comp-loader.component.html',
  styleUrl: './comp-loader.component.css'
})
export class CompLoaderComponent implements OnInit {
  compData: any = null;
  loadedComp: any = null;

  constructor(private compHtmlFetcher: CompHtmlFetcherService, private route: ActivatedRoute) {
    console.log("[log] inside comploader component");
  }

  async ngOnInit() {
    console.log("[log] container created");
    this.compData= this.route.snapshot.data['compData'];
    console.log(this.compData);

    this.loadedComp = await this.compHtmlFetcher.fetch(this.compData.compName);
  }
}
