import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {


  constructor(private http: HttpClient, private commonService: CommonService) {

  }


  getDataQuestionsList() {
    if (this.commonService.checkKeyExists('questions_list')) {
      return this.commonService.getData('questions_list');
    } else {
      this.commonService.setData('questions_list', firstValueFrom(this.getQuestions()));
      return this.commonService.getData('questions_list');
    }
  }

  getDataTagsList() {
    if (this.commonService.checkKeyExists('tags_list')) {
      return this.commonService.getData('tags_list');
    } else {
      this.commonService.setData('tags_list', firstValueFrom(this.getTags()));
      return this.commonService.getData('tags_list');
    }
  }

  getQuestions() {
    return this.http.get('http://localhost:8000/feedback/get-questions');
  }

  getTags() {
    return this.http.get('http://localhost:8000/feedback/get-tags');
  }
}
