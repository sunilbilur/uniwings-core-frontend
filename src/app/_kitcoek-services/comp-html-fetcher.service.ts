import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompsHtmlFetcherService {

  constructor(private http: HttpClient) {
  }

  async fetch(compName: any) {
    switch (compName) {
      case "comp1":
        return (await import("../kitcoek-components/comp-one/comp-one.component")).CompOneComponent;
        break;

      case "comp2":
        return (await import('../kitcoek-components/comp-two/comp-two.component')).CompTwoComponent;
        break;
      
      case "admin-students":
        return (await import('../kitcoek-components/admin-students/admin-students.component')).AdminStudentsComponent;
        break;

      default:
        return null;
    }
  }
}
