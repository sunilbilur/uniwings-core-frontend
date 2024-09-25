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

  getRoles(): Observable<any> {
    return this.http.get('http://localhost:8000/admin/get-roles');
  }

  getRoleConfig(selectedRole: string): Observable<any> {
    return this.http.get('http://localhost:8000/admin/get-roleconfig', {params: {role: selectedRole}});
  }

  getComponentsList(): Observable<any> {
    return this.http.get('http://localhost:8000/admin/get-components-list');
  }

  syncComponents(compsyncfile: any): Observable<any> {
    return this.http.post('http://localhost:8000/admin/sync-components', compsyncfile);
  }

  updateComponent(comp: any): Observable<any> {
    return this.http.post('http://localhost:8000/admin/update-component', comp);
  }
}
