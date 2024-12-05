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

  submitAdmissionForm(data: any): Observable<any> {
    return this.http.post('http://localhost:8000/admission/submit-student-admission-form', data);
  }
}
