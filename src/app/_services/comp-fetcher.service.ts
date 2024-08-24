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
      case "feedback-mgmt-title":
        return (await import('../app-components/feedback/feedback-mgmt-title/feedback-mgmt-title.component')).FeedbackMgmtTitleComponent;
        break;

      case "feedback-mgmt-schedule":
        return (await import('../app-components/feedback/feedback-mgmt-schedule/feedback-mgmt-schedule.component')).FeedbackMgmtScheduleComponent;
        break;
      case "feedback-mgmt-analysis":
        return (await import('../app-components/feedback/feedback-mgmt-analysis/feedback-mgmt-analysis.component')).FeedbackMgmtAnalysisComponent;
        break;
      case "feedback-ques-overview":
        return (await import('../app-components/feedback/feedback-ques-overview/feedback-ques-overview.component')).FeedbackQuesOverviewComponent;
        break;

      case "feedback-ques-list":
        return (await import('../app-components/feedback/feedback-ques-list/feedback-ques-list.component')).FeedbackQuesListComponent;
        break;

      case "feedback-ques-tags-chart":
        return (await import('../app-components/feedback/feedback-ques-tags-chart/feedback-ques-tags-chart.component')).FeedbackQuesTagsChartComponent;
        break;

      case "feedback-ques-title":
        return (await import('../app-components/feedback/feedback-ques-title/feedback-ques-title.component')).FeedbackQuesTitleComponent;
        break;

      default:
        //write code to remove string form beginning till last occurence of '/'
        let onlyCompName = compName.replace(/^.*[\\\/]/, '');

        //if a string is like feedback-ques-title then convert it to FeedbackQuesTitleComponent
        const pascalCaseCompName = onlyCompName.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join('').replace(/-/g, '');
        const componentName = `${pascalCaseCompName}Component`;
        console.log("compFetcher: componentName: ", componentName);

        console.log("compFetcher: inside default case");
        return (await import(`../app-components/${compName}/${onlyCompName}.component`))[`${componentName}`];
        break;
    }
  }
}
