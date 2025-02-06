import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcademicsService {

  constructor(private http: HttpClient) { }

  getPrograms(): Observable<any> {
    return this.http.get<any>("http://localhost:8000/academics/get-programs");
  }

  getDepartments(): Observable<any> {
    return this.http.get<any>("http://localhost:8000/academics/get-departments");
  }

  getCourses(departmentid: string): Observable<any> {
    return this.http.post<any>("http://localhost:8000/academics/get-courses", { departmentid: departmentid});
  }

  getAllCourses(): Observable<any> {  
    return this.http.get('http://localhost:8000/admin-active-institution/get-courses');
  }

  deleteDepartment(department: any): Observable<any> {
    return this.http.post('http://localhost:8000/admin-active-institution/delete-department', { departmentid: department });
  }
  addDepartment(data: any): Observable<any> {
    return this.http.post('http://localhost:8000/admin-active-institution/add-department', { department: data });
  }

  addCourse(data: any): Observable<any> {
    return this.http.post('http://localhost:8000/admin-active-institution/add-course', { course: data });
  }
  deleteCourse(course: any): Observable<any> {
    return this.http.post('http://localhost:8000/admin-active-institution/delete-course', { courseid: course });
  }
}
