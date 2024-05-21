import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompHtmlFetcherService {

  constructor(private http: HttpClient) {
  }

  async fetch(compName: any) {
    switch (compName) {
      case "admin-students":
        return (await import('../kitcoek-components/admin-students/admin-students.component')).AdminStudentsComponent;
        break;

      case "feedback-questions":
        return (await import('../kitcoek-components/feedback-questions/feedback-questions.component')).FeedbackQuestionsComponent;
        break;

      default:
        return null;
    }
  }
}
