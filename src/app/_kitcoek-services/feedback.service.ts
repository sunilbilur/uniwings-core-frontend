import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient ) { }

  getQuestions(){
    return this.http.get('http://localhost:8000/feedback/get-questions');
  }
}
