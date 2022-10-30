import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TopicsService } from '../../../../topics/services/topics.service';
import Topic from 'src/app/models/topic.model';

@Component({
  selector: 'app-topic-view',
  templateUrl: './topic-view.component.html',
  styleUrls: ['./topic-view.component.css'],
})
export class TopicViewComponent implements OnInit {
  show: boolean = false;
  topic: Topic = {
    id: undefined,
    name: '',
    content: '',
    isA: 'concept',
    sdesc: '',
  };
  @Output() showChanged = new EventEmitter<boolean>();

  constructor(private service: TopicsService) {}

  ngOnInit(): void {
    this.service.selectedTopic.subscribe((topicId: number | undefined) => {
      this.topic.id = topicId;
      this.changeShow(true);
    });

    this.service.editedTopic.subscribe(() => {
      this.changeShow(false);
      this.topic.id = undefined;
    });
  }

  changeShow(value: boolean) {
    this.show = value;
    this.showChanged.emit(value);
    if (this.show == true) {
      this.loadTopic();
    }
  }

  loadTopic() {
    if (this.topic.id !== undefined) {
      console.log('Loading topic.');
      this.service.getTopic(this.topic.id).subscribe((loadedTopic) => {
        console.log('LOADED TOPIC', loadedTopic);
        this.topic = loadedTopic;
      });
    }
  }
}
