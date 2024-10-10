import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveInstitutionService {
  private nameDataSource = new BehaviorSubject<string>('(Please select an institution)');  
  private iidDataSource = new BehaviorSubject<string>('null');  
  institutionName = this.nameDataSource.asObservable();  // Observable to be subscribed
  institutionIid = this.iidDataSource.asObservable();  // Observable to be subscribed

  constructor() {
  }

  setInstitutionName(data: string) {
    this.nameDataSource.next(data); 
  }

  setInstitutionIid(data: string) {
    this.iidDataSource.next(data); 
  }

  disconnect() {
    this.nameDataSource.next('(Please select an institution)');  
    this.iidDataSource.next('null');  
  }
}
