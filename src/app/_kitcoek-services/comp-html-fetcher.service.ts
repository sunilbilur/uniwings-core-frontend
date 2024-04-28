import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompsHtmlFetcherService {

  constructor(private http: HttpClient) {
  }

  async fetch(compName: any) {
    console.log("[log] executing fetch from CompsHtmlFetcherService");
    switch (compName) {
      case "comp1":
        console.log("[log] executing case 0");
        return (await import("../kitcoek-components/comp-one/comp-one.component")).CompOneComponent;
        break;

      case "comp2":
        console.log("[log] executing case 1");
        return (await (import('../kitcoek-components/comp-two/comp-two.component'))).CompTwoComponent;
        break;

      default:
        return null;
    }
  }
}
