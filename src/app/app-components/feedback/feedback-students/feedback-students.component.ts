import { Component, Input } from '@angular/core';
import { PageTitleComponent } from "../../appwide/page-title/page-title.component";
import { FeedbackService } from '../../../_services/feedback.service';
import { firstValueFrom } from 'rxjs';
import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-feedback-students',
  standalone: true,
  imports: [PageTitleComponent, ClarityModule],
  templateUrl: './feedback-students.component.html',
  styleUrl: './feedback-students.component.css'
})
export class FeedbackStudentsComponent {
  @Input() compConfig: any = null;
  feedbackList: any = [];
  selectedFeedback: any = null;
  selectedCourse: any = null;
  questionsList: any = [];
  feedbackFormData: any = { questions: [] };

  constructor(private feedbackService: FeedbackService) {
  }

  async ngOnInit() {
    this.feedbackList = await firstValueFrom(this.feedbackService.getScheduledFeedbacks());
    console.log("FEEDBACK LIST: ", this.feedbackList);
    console.log("feedback list: ", this.feedbackList);
  }

  async selectFeedback(feedback: any) {
    this.selectedFeedback = feedback;
    this.questionsList = await firstValueFrom(this.feedbackService.getQuestionsFromTags(feedback.tags));

    console.log("feedabck: ", this.selectedFeedback);
    console.log("questions list: ", this.questionsList);
  }

  selectCourse(course: any) {
    this.selectedCourse = course;
    console.log("COURSE: ",course);
  }

  getArrayOfTen() {
    return Array.from({ length: 10 }, (_, i) => i + 1);
  }

  setRadioValue(question: any, answer: any) {
    let addNewValueFlag = true;

    for (let q of this.feedbackFormData.questions) {
      if (q.question_id === question._id) {
        q.answer = answer;
        addNewValueFlag = false;
        break;
      }
    }

    if (addNewValueFlag) {
      this.feedbackFormData.questions.push(
        {
          question_id: question._id,
          question: question.question,
          type: question.type,
          answer: answer
        }
      );
    }
  }

  setDescriptiveValue(question: any, answer: any) {
    let found: boolean = false;

    this.feedbackFormData.questions.forEach((element: any) => {
      if (element.feedback_id === question._id) {
        found = true;
      }
    })

    if (found) {
      this.feedbackFormData.questions.forEach((element: any) => {
        if (question._id === element.feedback_id) {
          element.answer = answer;
        }
      });
    } else {
      this.feedbackFormData.questions.push(
        {
          feedback_id: question._id,
          question: question.question,
          question_id: question._id,
          type: question.type,
          answer: answer
        }
      );
    }
  }

  goToFeedbacks() {
    this.selectedCourse = null;
    this.selectedFeedback = null;
  }

  submitFeedback() {
    this.feedbackFormData.feedback_id = this.selectedFeedback._id;
    this.feedbackFormData.course = this.selectedCourse;
    this.feedbackService.submitStudentFeedback(this.feedbackFormData).subscribe();
    this.selectedCourse.alreadyAttempted = true;
    console.log(this.feedbackFormData);

    this.selectedCourse = null;
  }

}
