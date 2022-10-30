import { Component, Input } from '@angular/core';
import Topic from 'src/app/models/topic.model';
import { TopicsService } from '../../../../topics/services/topics.service';

@Component({
  selector: 'app-topic-view-buttons',
  templateUrl: './topic-view-buttons.component.html',
  styleUrls: ['./topic-view-buttons.component.css'],
})
export class TopicViewButtonsComponent {
  @Input() topic!: Topic;

  constructor(private service: TopicsService) {}

  editTopic() {
    this.service.editedTopic.next(this.topic.id);
  }

  deleteTopic() {
    if (this.topic.id === undefined) {
      return;
    }
    this.service.deleteTopic(this.topic.id);
  }
}
