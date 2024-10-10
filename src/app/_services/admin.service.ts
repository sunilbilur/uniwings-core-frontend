import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActiveInstitutionService } from './active-institution.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  activeInstitutionIid: string = '';

  constructor(private http: HttpClient, private activeInstitution: ActiveInstitutionService) {
    activeInstitution.institutionIid.subscribe(data => {
      this.activeInstitutionIid = data;
    });
  }

  getInstitutions(): Observable<any> {
    return this.http.get('http://localhost:8000/admin/get-institutions');
  }

  addRole(role: string): Observable<any> {
    return this.http.post('http://localhost:8000/admin/add-role', { iid: this.activeInstitutionIid, role: role });
  }

  deleteRole(role: string): Observable<any> {
    return this.http.post('http://localhost:8000/admin/delete-role', { iid: this.activeInstitutionIid, role: role });
  }

  getRoles(): Observable<any> {
    return this.http.get('http://localhost:8000/admin/get-roles', { params: { iid: this.activeInstitutionIid } });
  }

  getRoleConfig(selectedRole: string): Observable<any> {
    return this.http.get('http://localhost:8000/admin/get-roleconfig', { params: { iid: this.activeInstitutionIid, role: selectedRole } });
  }

  getComponentsList(): Observable<any> {
    return this.http.get('http://localhost:8000/admin/get-components-list');
  }

  syncComponents(compsyncfile: any): Observable<any> {
    return this.http.post('http://localhost:8000/admin/sync-components', compsyncfile);
  }

  updateComponent(comp: any): Observable<any> {
    comp.iid = this.activeInstitutionIid;
    return this.http.post('http://localhost:8000/admin/update-component', comp);
  }
}
