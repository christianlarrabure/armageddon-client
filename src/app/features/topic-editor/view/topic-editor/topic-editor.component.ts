import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import Topic from 'src/app/models/topic.model';
import { TopicsService } from '../../../../topics/topics.service';

@Component({
  selector: 'app-topic-editor',
  templateUrl: './topic-editor.component.html',
})
export class TopicEditorComponent implements OnInit {
  show: boolean = false;
  topic: Topic = {
    name: '',
    content: '',
    isA: 'concept',
    sdesc: '',
  };
  @Output() showChanged = new EventEmitter<boolean>();

  constructor(private service: TopicsService) {}

  ngOnInit(): void {
    this.service.editedTopic.subscribe((topicId: number | undefined) => {
      this.topic.id = topicId;
      this.changeShow(true);
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
      this.service.getTopic(this.topic.id).subscribe((loadedTopic) => {
        this.topic = loadedTopic;
      });
    } else {
      this.topic = {
        id: undefined,
        name: '',
        content: '',
        isA: 'concept',
        sdesc: '',
      };
    }
  }

  changeType(type: string) {
    if (type !== 'character' && type !== 'concept' && type !== 'object') {
      return;
    }

    this.topic.isA = type;
  }

  saveTopic() {
    if (this.topic.id !== undefined) {
      this.service.updateTopic(this.topic);
    } else {
      this.service.createTopic(this.topic);
    }
    this.changeShow(false);
  }
}
