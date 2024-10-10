import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  sharedData: any = new Map();

  constructor() { }

  getData(key: string) {
    return this.sharedData.get(key);
  }

  setData(key: string, data: any) {
    this.sharedData.set(key, data);
  }

  //write a function to check if a key exists in the map
  checkKeyExists(key: string) {
    return this.sharedData.has(key);
  }
}
