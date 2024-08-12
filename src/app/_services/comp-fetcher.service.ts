import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompFetcherService {

  constructor(private http: HttpClient) {
  }

  async fetch(compName: any) {
    switch (compName) {
      case "feedback_mgmt_title":
        return (await import('../app-components/feedback/feedback-mgmt-title/feedback-mgmt-title.component')).FeedbackMgmtTitleComponent;
        break;

      case "feedback-mgmt-schedule":
        return (await import('../app-components/feedback/feedback-mgmt-schedule/feedback-mgmt-schedule.component')).FeedbackMgmtScheduleComponent;
        break;
      case "feedback-mgmt-analysis":
        return (await import('../app-components/feedback/feedback-mgmt-analysis/feedback-mgmt-analysis.component')).FeedbackMgmtAnalysisComponent;
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

      case "feedback_ques_title":
        return (await import('../app-components/feedback/feedback-ques-title/feedback-ques-title.component')).FeedbackQuesTitleComponent;
        break;
      default:
        return null;
    }
  }
}