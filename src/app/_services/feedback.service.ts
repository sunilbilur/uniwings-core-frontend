import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { BehaviorSubject, firstValueFrom, scheduled } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient, private commonService: CommonService) {
    let sharedData = new BehaviorSubject<any>(null)
    this.commonService.setData('feedback', sharedData);
  }

  scheduleFeedback(feedbackForm: any) {
    return this.http.post('http://localhost:8000/feedback/schedule-feedback', feedbackForm);
  }

  getScheduledFeedbacks() {
    return this.http.get('http://localhost:8000/feedback/get-scheduled-feedbacks');
  }

  deleteScheduledFeedback(id: string) {
    return this.http.delete('http://localhost:8000/feedback/delete-scheduled-feedback/', { params: { feedbackid: id } });

  }

  setSelectedFeedbackData(feedback: any) {
    this.commonService.getData('feedback').next(feedback);
  }

  getSelectedFeedbackData() {
    return this.commonService.getData('feedback');
  }

  getDataQuestionsList() {
    if (this.commonService.checkKeyExists('questions_list')) {
      return this.commonService.getData('questions_list');
    } else {
      this.commonService.setData('questions_list', firstValueFrom(this.getQuestions()));
      return this.commonService.getData('questions_list');
    }
  }

  getQuestionsFromTags(tags: any) {
    return this.http.post('http://localhost:8000/feedback/get-questions-from-tags', {tags: tags});
  }

  addNewQuestion(question: any) {
    return this.http.post('http://localhost:8000/feedback/add-question', question);
  }

  deleteQuestion(id: string) {
    return this.http.delete('http://localhost:8000/feedback/delete-question/', { params: { questionid: id } });
  }

  getDataTagsList() {
    if (this.commonService.checkKeyExists('tags_list')) {
      return this.commonService.getData('tags_list');
    } else {
      this.commonService.setData('tags_list', firstValueFrom(this.getTags()));
      return this.commonService.getData('tags_list');
    }
  }

  saveTags(tagslist: any) {
    return this.http.post('http://localhost:8000/feedback/save-tags', tagslist);
  }

  getQuestions() {
    return this.http.get('http://localhost:8000/feedback/get-questions');
  }

  getTags() {
    return this.http.get('http://localhost:8000/feedback/get-tags');
  }

  submitStudentFeedback(feedbackFromData: any) {
    return this.http.post('http://localhost:8000/feedback/submit-student-feedback', {feedback_form: feedbackFromData});
  }
}
