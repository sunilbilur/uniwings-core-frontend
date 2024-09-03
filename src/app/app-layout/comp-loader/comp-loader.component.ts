import { Component, Input, OnInit } from '@angular/core';

import { CompFetcherService } from '../../_services/comp-fetcher-dyn.service';
import { NgComponentOutlet } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

//following line ensures that manual code splitting happens for paths defined inside following component
//but (hopefully?) this component is never loaded, it is only there to implement manual code splitting
import '../../manual-code-splitting/manual-code-splitting.component';

@Component({
  selector: 'comp-loader-component',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './comp-loader.component.html',
  styleUrl: './comp-loader.component.css'
})
export class CompLoaderComponent implements OnInit {
  // @Input() rowColComp: any = null;
  compData: any = null;
  compsMap: any = new Map();

  constructor(private compFetcher: CompFetcherService, private route: ActivatedRoute) {
    console.log("[log] comp-loader.component.ts || inside comploader component constructor");
  }

  async ngOnInit() {
    this.compData = this.route.snapshot.data['compData'];
    console.log("[log] comp-loader-component.ts || compData: ", this.compData);

    //extract the list of component names from the compData
    let flatCompData: [] = this.flattenArray(this.compData);
    let compsList: any = flatCompData.filter((x: any) => typeof x == "string" && x != "row" && x != "col");

    //fetch all the components and store them in the map
    for (let key of compsList) {
      this.compsMap.set(key, (await this.compFetcher.fetch(key)));
    }

    // // Recursive solution to fetch the component html
    // // set rowColComp to compData if it is null
    // // It will be null only if the component is loaded directly
    // if (this.rowColComp == null) 
    //   this.rowColComp = this.compData;
    // console.log("rowcolcomp: ", this.rowColComp);
    //
    // // if rowColComp is not null means it has received the data from the parent component
    // // and can potentially hold a component inside which needs to be fetched
    // if (this.rowColComp != null) 
    //   if (typeof this.rowColComp[0] == "string" && this.rowColComp[0] != "row" && this.rowColComp[0] != "col") 
    //     this.compHTML = await this.compHtmlFetcher.fetch(this.rowColComp[0]);
    //   
    // console.log("compHTML: ", this.compHTML);
  }

  //flatten the array
  //e.g.
  //input: [1, [2, 3, [4, 5]], 6]
  //output: [1, 2, 3, 4, 5, 6]
  flattenArray(arr: []): any {
    var ret: [] | never[] = [];

    for (var i = 0; i < arr.length; i++)
      if (Array.isArray(arr[i]))
        ret = ret.concat(this.flattenArray(arr[i]));
      else
        ret.push(arr[i]);

    return ret;
  }
}
