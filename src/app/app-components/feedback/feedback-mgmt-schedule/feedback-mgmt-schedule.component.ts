import { Component, Input } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { FeedbackService } from '../../../_services/feedback.service';
import { AcademicsService } from '../../../_services/academics.service';
import { first, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-feedback-mgmt-schedule',
  standalone: true,
  imports: [ClarityModule],
  templateUrl: './feedback-mgmt-schedule.component.html',
  styleUrl: './feedback-mgmt-schedule.component.css'
})
export class FeedbackMgmtScheduleComponent {
  @Input() compConfig: any;
  scheduleFeedbackWizardOpened: boolean = false;

  programList: any = null;
  coursesList: any = null;
  scheduledFeedbacks: any = [];
  feedbackForm: any = {};

  feedbackCourses: any = [];
  selectedDepartment: string = "";
  selectedCourse: any = null;

  feedbackStartDate: any = null;
  feedbackEndDate: any = null;
  tagsDocument: any = [];
  selectedTags: string[] = [];
  startDate: any = null;

  constructor(private feedbackService: FeedbackService, private academicsService: AcademicsService) {
    console.log("[log] feedback-mgmt-schedule.component.ts || inside constructor");
  }

  async ngOnInit() {
    this.programList = await firstValueFrom(this.academicsService.getDepartments());
    this.tagsDocument = await this.feedbackService.getDataTagsList();
    this.scheduledFeedbacks = await firstValueFrom(this.feedbackService.getScheduledFeedbacks());
  }

  async setProgram(programRef: any) {
    this.selectedDepartment = programRef.value;
    console.log("selected department: ", this.selectedDepartment);
    this.coursesList = await firstValueFrom(this.academicsService.getCourses(this.selectedDepartment));
  }

  removeFromSelectedCourses(course: any) {
    this.feedbackCourses.splice(this.feedbackCourses.indexOf(course), 1);
  }


  addToSelectedCourses(courseRef: any) {
    this.coursesList.forEach((course: any) => {
      if (course._id == courseRef.value) {
        if (!this.feedbackCourses.includes(course)) {
          this.feedbackCourses.push(course);
        }
      }
    })
  }

  deleteScheduledFeedback(feedbackid: any) {
    this.scheduledFeedbacks.forEach((feedback: any) => {
      if (feedback._id == feedbackid) {
        this.scheduledFeedbacks.splice(this.scheduledFeedbacks.indexOf(feedback), 1);
      }
    })

    this.feedbackService.setSelectedFeedbackData(null);
    this.feedbackService.deleteScheduledFeedback(feedbackid).subscribe();
  }

  selectFeedback(feedback: any) {
    this.feedbackService.setSelectedFeedbackData(feedback);
  }
  
  setFeedbackName(textareaRef: any) {
    this.feedbackForm.name = textareaRef.value;
  }

  toggleTag(tagRef: any, tag: string) {
    tagRef.classList.toggle("hover:bg-slate-200");

    if (this.selectedTags.includes(tag)) {
      this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
      tagRef.style.backgroundColor = "white";
    }
    else {
      this.selectedTags.push(tag);
      tagRef.style.backgroundColor = "rgb(0,240,0)";
    }
  }

  scheduleFeedback() {
    this.feedbackForm.tags = this.selectedTags;
    this.feedbackForm.courses = this.feedbackCourses;
    this.feedbackForm.start_date = this.feedbackStartDate;
    this.feedbackForm.end_date = this.feedbackEndDate;

    this.feedbackService.scheduleFeedback(this.feedbackForm).subscribe();
    this.scheduleFeedbackWizardOpened = false;
    console.log(this.feedbackForm);
  }
}

