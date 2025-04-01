import { Component, Input } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { FeedbackService } from '../../../_services/feedback.service';
import { AcademicsService } from '../../../_services/academics.service';
import { first, firstValueFrom } from 'rxjs';
import { AdmissionService } from '../../../_services/admission.service';
import { ToastrService } from 'ngx-toastr';

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

  programs: any = null;
  classes: any = null;
  years: any = null;
  batches: any = null;

  selectedClass: any = {
  };
  selectedFeedbackClasses: any = [];

  departmentsList: any = null;
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

  constructor(private feedbackService: FeedbackService,
    private academicsService: AcademicsService,
    private toastr: ToastrService,
    private admissionService: AdmissionService) {
    console.log("[log] feedback-mgmt-schedule.component.ts || inside constructor");
  }

  async ngOnInit() {
    this.programs = await firstValueFrom(this.admissionService.getOptions("academic_programs"));
    this.classes = await firstValueFrom(this.admissionService.getOptions("academic_class"));
    this.years = await firstValueFrom(this.admissionService.getOptions("academic_year"));
    this.batches = await firstValueFrom(this.admissionService.getOptions("academic_batch"));

    this.departmentsList = await firstValueFrom(this.academicsService.getDepartments());

    this.tagsDocument = await this.feedbackService.getDataTagsList();
    this.scheduledFeedbacks = await firstValueFrom(this.feedbackService.getAllFeedbacks());
  }

  async setDepartment(programRef: any) {
    this.selectedDepartment = programRef.value;
    console.log("selected department: ", this.selectedDepartment);
    this.coursesList = await firstValueFrom(this.academicsService.getCourses(this.selectedDepartment));
  }

  removeFromSelectedCourses(course: any) {
    this.feedbackCourses.splice(this.feedbackCourses.indexOf(course), 1);
  }

  setClass(ref: any, field: any) {
    this.selectedClass[field] = ref.value;
  }

  addToSelectedClasses() {
    console.log("SELECTED CLASS: ", this.selectedClass);

    if (this.selectedClass.class === undefined ||
      this.selectedClass.batch === undefined ||
      this.selectedClass.year === undefined ||
      this.selectedClass.program === undefined) {
        this.toastr.info("Please select all fields");
      return;
    }

    for (let classItem of this.selectedFeedbackClasses) {
      if (this.selectedClass.program === classItem.program &&
        this.selectedClass.year === classItem.year &&
        this.selectedClass.class === classItem.class &&
        this.selectedClass.batch === classItem.batch) {
        console.log("skipped: ", this.selectedClass, classItem);
        return;
      }
    }

    this.selectedFeedbackClasses.push({ ...this.selectedClass });
  }

  removeFromSelectedClasses(classRef: any) {
    this.selectedFeedbackClasses.splice(this.selectedFeedbackClasses.indexOf(classRef), 1);
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

  setFeedbackStartDate(event: any) {
    this.feedbackStartDate = event.toString();
  }

  setFeedbackEndDate(event: any) {
    this.feedbackEndDate = event.toString();
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
    this.scheduleFeedbackWizardOpened = true;

    if (this.feedbackForm.name == null || this.feedbackForm.name == "") {
      this.toastr.error("Please enter a name for the feedback");
      return;
    } else if (this.feedbackCourses.length == 0) {
      this.toastr.error("Please select at least one course");
      return;
    } else if (this.selectedFeedbackClasses.length == 0) {
      this.toastr.error("Please select at least one class");
      return;
    } else if (this.feedbackStartDate == null || this.feedbackEndDate == null) {
      this.toastr.error("Please select a start and end date");
      return;
    } else if (this.selectedTags.length == 0) {
      this.toastr.error("Please select at least one tag");
      return;
    }

    console.log("Checks passed");

    this.feedbackForm.tags = this.selectedTags;
    this.feedbackForm.courses = this.feedbackCourses;
    this.feedbackForm.start_date = this.feedbackStartDate;
    this.feedbackForm.end_date = this.feedbackEndDate;
    this.feedbackForm.class = this.selectedFeedbackClasses;

    this.feedbackService.scheduleFeedback(this.feedbackForm).subscribe();
    this.scheduleFeedbackWizardOpened = false;

    this.scheduledFeedbacks.push(this.feedbackForm);
    console.log(this.feedbackForm);
  }
}

