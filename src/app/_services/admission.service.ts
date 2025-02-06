import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {

  constructor(private http: HttpClient) { }

  getAdmissionFormFields(): Observable<any> {
    return this.http.get('http://localhost:8000/student/get-admission-form-fields');
  }

  getOptions(item: any) {
    return this.http.post('http://localhost:8000/student/get-options', { name: item });
  }

  submitAdmissionForm(data: any): Observable<any> {
    return this.http.post('http://localhost:8000/admission/submit-student-admission-form', data);
  }

  changeClass(program: any, fromClass: any, toClass: any): Observable<any> {
    return this.http.post('http://localhost:8000/admission/change-class', { program: program, fromClass: fromClass, toClass: toClass });
  }

  deleteStudent(id: any): Observable<any> {
    return this.http.post('http://localhost:8000/admission/delete-student', { id: id });
  }

  updateAdmissionForm(id: any, data: any): Observable<any> {
    return this.http.post('http://localhost:8000/admission/update-student', { id: id, data: data });
  }
}
