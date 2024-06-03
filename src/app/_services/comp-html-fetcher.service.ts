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
      case "feedback-questions":
        return (await import('../app-components/feedback/feedback-questions/feedback-questions.component')).FeedbackQuestionsComponent;
        break;

      default:
        return null;
    }
  }
}
