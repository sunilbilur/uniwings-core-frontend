import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

enum compsName {
  comp1,
  comp2,
};

@Injectable({
  providedIn: 'root'
})
export class CompsHtmlFetcherService {

  constructor(private http: HttpClient) {
  }

  async fetch(compName: compsName) {
    switch (compName) {
      case compsName.comp1:
        return (await import("../components/comp-one/comp-one.component")).CompOneComponent;
        break;

      case compsName.comp2:
        return (await (import('../components/comp-two/comp-two.component'))).CompTwoComponent;
        break;

      default:
        return null;
    }
  }
}
