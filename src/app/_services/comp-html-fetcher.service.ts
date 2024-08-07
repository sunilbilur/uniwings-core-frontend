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

      case "feedback_ques_overview":
        return (await import('../app-components/feedback/feedback-ques-overview/feedback-ques-overview.component')).FeedbackQuesOverviewComponent;
        break;

      case "feedback_ques_list":
        return (await import('../app-components/feedback/feedback-ques-list/feedback-ques-list.component')).FeedbackQuesListComponent;
        break;

      case "feedback_ques_tags_chart":
        return (await import('../app-components/feedback/feedback-ques-tags-chart/feedback-ques-tags-chart.component')).FeedbackQuesTagsChartComponent;
        break;

      default:
        return null;
    }
  }
}
