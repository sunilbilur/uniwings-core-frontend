import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentManagementService {
  constructor(private http: HttpClient ) { }

  getAllStudents(): Observable<any> {
    return this.http.get('http://localhost:8000/student/get-all-students');
  }

  searchStudents(searchQuery: string, searchIn: string): Observable<any> {
    return this.http.post("http://localhost:8000/student/search-students", { query: searchQuery, searchIn: searchIn });
  }

}
