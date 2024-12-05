import { Component, Input } from '@angular/core';
import { ClrDatagridModule, ClrIconModule } from '@clr/angular';
import { DatagridComponent } from '../../appwide/datagrid/datagrid.component';
import { FeedbackService } from '../../../_services/feedback.service';
import { firstValueFrom } from 'rxjs';

import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-feedback-ques-list',
  standalone: true,
  imports: [ClarityModule, ClrDatagridModule, ClrIconModule],
  templateUrl: './feedback-ques-list.component.html',
  styleUrl: './feedback-ques-list.component.css'
})
export class FeedbackQuesListComponent {
  @Input() compConfig = null;
  users: any = [];
  questionsList: any = [];
  tagsDocument: any = [];
  selectedTags: string[] = [];
  addQuestionModal: boolean = false;
  manageTagsModal: boolean = false;
  editQuestionModal: boolean = false;
  currentEditQuestion: any = null;
  currentNewQuestion: any = {};

  constructor(private feedbackService: FeedbackService) {

  }

  async ngOnInit() {
    this.questionsList = await this.feedbackService.getDataQuestionsList();
    this.tagsDocument = await this.feedbackService.getDataTagsList();
  }

  setNewQuestion(question: any) {
    this.currentNewQuestion.question = question;
  }

  setNewQuestionType(type: any) {
    this.currentNewQuestion.type = type;
  }

  addNewQuestion() {
    this.addQuestionModal = false;
    this.currentNewQuestion.tags = this.selectedTags;
    this.feedbackService.addNewQuestion(this.currentNewQuestion).subscribe();
    console.log(this.currentNewQuestion);
  }

  openQuestionEditModal(question: any) {
    this.editQuestionModal = true;
    this.currentEditQuestion = question;
    console.log(question);
  }

  deleteQuestion(id: string) {
    this.questionsList.splice(this.questionsList.indexOf(id), 1);
    this.feedbackService.deleteQuestion(id).subscribe();
  }

  addNewTag(tag: string) {
    if(this.tagsDocument.tags.includes(tag)){
      return;
    }
    this.tagsDocument.tags.push(tag);
  }

  selectTag(tag: string) {
    //push into tags array, if not already present
    if (this.selectedTags.includes(tag)) {
      return;
    }
    this.selectedTags.push(tag);
  }

  deleteTag(tag: string) {
    this.tagsDocument.tags.splice(this.tagsDocument.tags.indexOf(tag), 1);
  }

  saveTags(){
    this.feedbackService.saveTags(this.tagsDocument).subscribe();
    this.manageTagsModal = false;
  }

}
