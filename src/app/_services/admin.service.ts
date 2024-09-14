import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  getInstitutions(): Observable<any> {
    return this.http.get('http://localhost:8000/admin/get-institutions');
  }
}
