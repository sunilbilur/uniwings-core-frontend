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
		case 'components-library':
			return (await import('../app-components/admin/components-library/components-library.component')).ComponentsLibraryComponent
		case 'forms-management':
			return (await import('../app-components/admin/forms-management/forms-management.component')).FormsManagementComponent
		case 'institutions-management':
			return (await import('../app-components/admin/institutions-management/institutions-management.component')).InstitutionsManagementComponent
		case 'role-configs-management':
			return (await import('../app-components/admin/role-configs-management/role-configs-management.component')).RoleConfigsManagementComponent
		case 'components-tab':
			return (await import('../app-components/admin/role-configs-management/components-tab/components-tab.component')).ComponentsTabComponent
		case 'comp-element':
			return (await import('../app-components/admin/role-configs-management/components-tab/utilities/comp-element/comp-element.component')).CompElementComponent
		case 'information-tab':
			return (await import('../app-components/admin/role-configs-management/information-tab/information-tab.component')).InformationTabComponent
		case 'navigation-entries-tab':
			return (await import('../app-components/admin/role-configs-management/navigation-entries-tab/navigation-entries-tab.component')).NavigationEntriesTabComponent
		case 'datagrid':
			return (await import('../app-components/appwide/datagrid/datagrid.component')).DatagridComponent
		case 'page-title':
			return (await import('../app-components/appwide/page-title/page-title.component')).PageTitleComponent
		case 'feedback-mgmt-analysis':
			return (await import('../app-components/feedback/feedback-mgmt-analysis/feedback-mgmt-analysis.component')).FeedbackMgmtAnalysisComponent
		case 'feedback-mgmt-schedule':
			return (await import('../app-components/feedback/feedback-mgmt-schedule/feedback-mgmt-schedule.component')).FeedbackMgmtScheduleComponent
		case 'feedback-mgmt-title':
			return (await import('../app-components/feedback/feedback-mgmt-title/feedback-mgmt-title.component')).FeedbackMgmtTitleComponent
		case 'feedback-ques-list':
			return (await import('../app-components/feedback/feedback-ques-list/feedback-ques-list.component')).FeedbackQuesListComponent
		case 'feedback-ques-overview':
			return (await import('../app-components/feedback/feedback-ques-overview/feedback-ques-overview.component')).FeedbackQuesOverviewComponent
		case 'feedback-ques-tags-chart':
			return (await import('../app-components/feedback/feedback-ques-tags-chart/feedback-ques-tags-chart.component')).FeedbackQuesTagsChartComponent
		case 'feedback-ques-title':
			return (await import('../app-components/feedback/feedback-ques-title/feedback-ques-title.component')).FeedbackQuesTitleComponent
		case 'feedback-results':
			return (await import('../app-components/feedback/feedback-results/feedback-results.component')).FeedbackResultsComponent
		case 'feedback-schedule':
			return (await import('../app-components/feedback/feedback-schedule/feedback-schedule.component')).FeedbackScheduleComponent
		case 'feedback-students':
			return (await import('../app-components/feedback/feedback-students/feedback-students.component')).FeedbackStudentsComponent
		case 'apply-leaves':
			return (await import('../app-components/leaves/apply-leaves/apply-leaves.component')).ApplyLeavesComponent
		case 'approve-leaves':
			return (await import('../app-components/leaves/approve-leaves/approve-leaves.component')).ApproveLeavesComponent
		case 'library-bookbank-management':
			return (await import('../app-components/library/library-bookbank-management/library-bookbank-management.component')).LibraryBookbankManagementComponent
		case 'library-books-management':
			return (await import('../app-components/library/library-books-management/library-books-management.component')).LibraryBooksManagementComponent
		case 'library-student':
			return (await import('../app-components/library/library-student/library-student.component')).LibraryStudentComponent
		case 'student-admission':
			return (await import('../app-components/student-management/student-admission/student-admission.component')).StudentAdmissionComponent
		case 'student-info-control-bar':
			return (await import('../app-components/student-management/student-info-control-bar/student-info-control-bar.component')).StudentInfoControlBarComponent
		case 'student-info-title':
			return (await import('../app-components/student-management/student-info-title/student-info-title.component')).StudentInfoTitleComponent
		default:
			throw new Error(`Component not found for the given key.`);
		}
	}
}
