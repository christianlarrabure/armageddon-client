import { Component, Input, Output, EventEmitter } from '@angular/core';
import Topic from 'src/app/models/topic.model';
import { TopicsService } from '../../topics/services/topics.service';
@Component({
  selector: 'app-smart-search-found-topics',
  templateUrl: './smart-search-found-topics.component.html',
  styleUrls: ['./smart-search-found-topics.component.css'],
})
export class SmartSearchFoundTopicsComponent {
  @Input() topics!: Topic[];
  @Output() pickTopic = new EventEmitter<number | undefined>();

  constructor(private service: TopicsService) {}

  openTopic(id: number | undefined) {
    this.pickTopic.emit(id);
  }

  newTopic() {
    this.service.editedTopic.next(undefined);
  }
}
