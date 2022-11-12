import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import Topic from '../../../../models/topic.model';
import { EFeedScreen } from '../../interfaces/FeedScreen.interface';
import { TopicsService } from '../../../../topics/services/topics.service';

@Component({
  selector: 'app-topic-view',
  templateUrl: './topic-view.component.html',
})
export class TopicViewComponent implements OnInit {
  @Output() openPage = new EventEmitter<EFeedScreen>();
  @Input() topic: Topic | undefined | null = {
    name: '',
    isA: 'concept',
    content: '',
    sdesc: '',
    taste: '',
  };

  constructor(private service: TopicsService) {}

  ngOnInit(): void {}

  return() {
    this.openPage.emit(EFeedScreen.CONTEXT_MENU);
  }

  editItem() {
    this.service.editedTopic.next(this.topic?.id);
    this.openPage.emit(EFeedScreen.TOPIC_EDIT);
  }

  deleteItem() {
    if (this.topic?.id !== undefined) {
      this.service.deleteTopic(this.topic?.id);
    }
    this.openPage.emit(EFeedScreen.CONTEXT_MENU);
  }
}
