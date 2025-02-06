import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormsSchemasService {

  constructor(private http: HttpClient) { }

  getFormsAndSchemas(formname: string): Observable<any> {
    return this.http.post('http://localhost:8000/general/get-forms-and-schemas', { formname: formname });
  }
}
