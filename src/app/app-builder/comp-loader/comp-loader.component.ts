import { Component, Input, OnInit } from '@angular/core';

import { CompHtmlFetcherService } from '../../_services/comp-html-fetcher.service';
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
  compOptions: any =null;
  compName: any = null;

  constructor(private compHtmlFetcher: CompHtmlFetcherService, private route: ActivatedRoute) {
    console.log("[log] comp-loader.component.ts || inside comploader component constructor");
  }

  async ngOnInit() {
    this.compData= this.route.snapshot.data['compData'];
    this.compOptions = this.compData.compOptions;
    this.compName = await this.compHtmlFetcher.fetch(this.compData.compName);
  }
}
