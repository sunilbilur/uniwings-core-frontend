import { Component, Input } from '@angular/core';
import { ClrDatagridModule, ClrIconModule } from '@clr/angular';
import { DatagridComponent } from '../../appwide/datagrid/datagrid.component';
import { FeedbackService } from '../../../_services/feedback.service';
import { firstValueFrom } from 'rxjs';

import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-feedback-ques-list',
  standalone: true,
  imports: [DatagridComponent, ClarityModule, ClrDatagridModule, ClrIconModule],
  templateUrl: './feedback-ques-list.component.html',
  styleUrl: './feedback-ques-list.component.css'
})
export class FeedbackQuesListComponent {
  @Input() compConfig = null;
  users: any = [];
  questionsList: any = [];
  tagsList: any = [];
  selectedTags: string[] = [];
  addQuestionModal: boolean = false;
  manageTagsModal: boolean = false;
  editQuestionModal: boolean = false;
  currentEditQuestion: any = null;
  currentNewQuestion: any = null;

  constructor(private feedbackService: FeedbackService) {

  }

  async ngOnInit() {
    this.questionsList = await this.feedbackService.getDataQuestionsList();
    this.tagsList = await this.feedbackService.getDataTagsList();
  }

  addNewQuestion() {
    this.addQuestionModal = false;
  }

  openQuestionEditModal(question: any) {
    this.editQuestionModal = true;
    this.currentEditQuestion = question;
    console.log(question);
  }

  selectTag(tag: string) {
    this.selectedTags.push(tag);
  }

}
