import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {
  }

  addInstitution(data: any): Observable<any> {
    return this.http.post('http://localhost:8000/admin/add-institution', { institution: data });
  }

  refreshComponents(): Observable<any> {
    return this.http.get("http://localhost:8000/admin/comp-sync-file");
  }

  getInstitutions(): Observable<any> {
    return this.http.get('http://localhost:8000/admin/get-institutions');
  }

  getComponentsList(): Observable<any> {
    return this.http.get('http://localhost:8000/admin/get-components-list');
  }

  getPrograms(): Observable<any> {
    return this.http.get('http://localhost:8000/admin-active-institution/get-programs');
  }

  addProgram(data: any): Observable<any> {
    return this.http.post('http://localhost:8000/admin-active-institution/add-program', { program: data });
  }

  deleteProgram(program: any): Observable<any> {
    return this.http.post('http://localhost:8000/admin-active-institution/delete-program', { program: program });
  }

  getDepartments(): Observable<any> {
    return this.http.get('http://localhost:8000/admin-active-institution/get-departments');
  }

  addDepartment(data: any): Observable<any> {
    return this.http.post('http://localhost:8000/admin-active-institution/add-department', { department: data });
  }

  deleteDepartment(department: any): Observable<any> {
    return this.http.post('http://localhost:8000/admin-active-institution/delete-department', { departmentid: department });
  }

  getCourses(): Observable<any> {
    return this.http.get('http://localhost:8000/admin-active-institution/get-courses');
  }

  addCourse(data: any): Observable<any> {
    return this.http.post('http://localhost:8000/admin-active-institution/add-course', { course: data });
  }

  deleteCourse(course: any): Observable<any> {
    return this.http.post('http://localhost:8000/admin-active-institution/delete-course', { courseid: course });
  }

  addClass(option: any, name: any): Observable<any> {
    return this.http.post('http://localhost:8000/admin-active-institution/add-class', { activeOption: option, class: name });
  }

  deleteClass(option: any, name: any): Observable<any> {
    return this.http.post('http://localhost:8000/admin-active-institution/delete-class', { activeOption: option, class: name });
  }

  getClasses(): Observable<any> {
    return this.http.get('http://localhost:8000/admin-active-institution/get-classes');
  }

  getFormsAndSchemas(): Observable<any> {
    return this.http.get('http://localhost:8000/admin-active-institution/get-forms-and-schemas');
  }

  updateFormSchema(oldName: any, data: any): Observable<any> {
    return this.http.post('http://localhost:8000/admin-active-institution/update-form-schema', { oldName: oldName, formData: data });
  }

  deleteFormSchema(name: any): Observable<any> {
    return this.http.post('http://localhost:8000/admin-active-institution/delete-form-schema', { formName: name });
  }

  addNewFormSchema(data: any): Observable<any> {
    return this.http.post('http://localhost:8000/admin-active-institution/add-new-form-schema', { formName: data });
  }

  addRole(role: string): Observable<any> {
    return this.http.post('http://localhost:8000/admin-active-institution/add-role', { role: role });
  }

  deleteRole(role: string): Observable<any> {
    return this.http.post('http://localhost:8000/admin-active-intitution/delete-role', { role: role });
  }

  getRoles(): Observable<any> {
    return this.http.get('http://localhost:8000/admin-active-institution/get-roles');
  }

  getRoleConfig(selectedRole: string): Observable<any> {
    return this.http.get('http://localhost:8000/admin-active-institution/get-roleconfig', { params: { role: selectedRole } });
  }

  updateRoleConfig(roleName: string, roleConfig: any): Observable<any> {
    return this.http.post('http://localhost:8000/admin-active-institution/update-roleconfig', { role: roleName, roleConfig: roleConfig });
  }

  syncComponents(compsyncfile: any): Observable<any> {
    return this.http.post('http://localhost:8000/admin/sync-components', compsyncfile);
  }

  updateComponent(comp: any): Observable<any> {
    return this.http.post('http://localhost:8000/admin/update-component', comp);
  }
}
